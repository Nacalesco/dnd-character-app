// app/(tabs)/attributes.tsx
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import SaveIndicator from '../../components/SaveIndicator';
import { useTheme } from '../context/ThemeContext';
import { ThemedView, ThemedText, ThemedScrollView, ThemedTextInput, ThemedButton } from '../../components/ThemedComponents';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { races } from '../data/dnd5eData';

// Definimos los tipos de atributos para evitar errores de índice
type AttributeKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export default function AttributesScreen() {
  const { character, setCharacter, saveCharacter } = useCharacter();
  const { colors } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [pointBuy, setPointBuy] = useState(false);
  const [pointsRemaining, setPointsRemaining] = useState(27); // Para el sistema point buy
  const [standardArray, setStandardArray] = useState(false);
  const [usedStandardValues, setUsedStandardValues] = useState<number[]>([]);
  
  const standardValues = [15, 14, 13, 12, 10, 8]; // Valores del standard array

  useEffect(() => {
    setIsSaving(true);
    const saveTimeout = setTimeout(() => {
      saveCharacter(character);
      setIsSaving(false);
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [character]);

  // Cálculo del modificador de atributo según las reglas de D&D 5e
  const calculateModifier = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  // Formatear el modificador para mostrarlo como +X o -X
  const formatModifier = (mod: number) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  // Obtener los bonus raciales para un atributo específico
  const getRacialBonus = (attribute: AttributeKey) => {
    if (!character.basicInfo.race) return 0;
    
    const race = races.find(r => r.name === character.basicInfo.race || r.id === character.basicInfo.race);
    if (!race) return 0;
    
    let bonus = 0;
    
    // Bonus de la raza principal
    if (race.abilityScores && attribute in race.abilityScores) {
      const attrValue = race.abilityScores[attribute as keyof typeof race.abilityScores];
      if (typeof attrValue === 'number') {
        bonus += attrValue;
      }
    }
    
    // Bonus de la subraza, si existe
    if (character.basicInfo.subrace && race.subraces) {
      const subrace = race.subraces.find(
        sr => sr.name === character.basicInfo.subrace || sr.id === character.basicInfo.subrace
      );
      
      if (subrace && subrace.abilityScores && attribute in subrace.abilityScores) {
        const subraceAttrValue = subrace.abilityScores[attribute as keyof typeof subrace.abilityScores];
        if (typeof subraceAttrValue === 'number') {
          bonus += subraceAttrValue;
        }
      }
    }
    
    return bonus;
  };

  // Calcular el costo de point buy para un valor de atributo
  const getPointBuyCost = (value: number) => {
    if (value <= 13) return value - 8;
    if (value === 14) return 7;
    if (value === 15) return 9;
    return 0; // Por si acaso
  };

  // Manejar cambios de atributos en el modo point buy
  const handlePointBuyChange = (attribute: AttributeKey, newValue: number) => {
    const oldValue = character.attributes[attribute];
    const oldCost = getPointBuyCost(oldValue);
    const newCost = getPointBuyCost(newValue);
    const costDifference = newCost - oldCost;
    
    if (pointsRemaining - costDifference < 0) {
      Alert.alert("No hay suficientes puntos", `Necesitas ${costDifference} puntos para aumentar este atributo a ${newValue}, pero solo tienes ${pointsRemaining}.`);
      return;
    }
    
    setPointsRemaining(prev => prev - costDifference);
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: newValue
      }
    }));
  };

  // Manejar cambios en modo standard array
  const handleStandardArrayChange = (attribute: AttributeKey, value: number) => {
    if (usedStandardValues.includes(value) && character.attributes[attribute] !== value) {
      Alert.alert("Valor ya usado", `El valor ${value} ya está asignado a otro atributo.`);
      return;
    }
    
    // Quitar el valor anterior de la lista de usados si existe
    const oldValue = character.attributes[attribute];
    const newUsedValues = usedStandardValues.filter(v => v !== oldValue);
    
    // Añadir el nuevo valor a la lista de usados
    if (value !== 0) { // 0 es nuestro valor por defecto para "no asignado"
      newUsedValues.push(value);
    }
    
    setUsedStandardValues(newUsedValues);
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: value
      }
    }));
  };

  // Botones para incrementar/decrementar atributos
  const AttributeAdjuster = ({ attribute, label }: { attribute: AttributeKey, label: string }) => {
    const baseValue = character.attributes[attribute] || 10;
    const racialBonus = getRacialBonus(attribute);
    const totalValue = baseValue + racialBonus;
    const modifier = calculateModifier(totalValue);
    
    const increment = () => {
      if (pointBuy) {
        if (baseValue < 15) {
          handlePointBuyChange(attribute, baseValue + 1);
        }
      } else if (standardArray) {
        // En standard array, mostrar un selector de valores
        Alert.alert(
          "Seleccionar Valor",
          "Elige un valor del Standard Array:",
          standardValues.map(value => ({
            text: value.toString(),
            onPress: () => handleStandardArrayChange(attribute, value)
          }))
        );
      } else {
        // Incremento normal
        setCharacter(prev => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            [attribute]: baseValue + 1
          }
        }));
      }
    };
    
    const decrement = () => {
      if (pointBuy) {
        if (baseValue > 8) {
          handlePointBuyChange(attribute, baseValue - 1);
        }
      } else if (standardArray) {
        // En standard array, desasignar el valor
        handleStandardArrayChange(attribute, 0);
      } else {
        // Decremento normal
        if (baseValue > 1) {
          setCharacter(prev => ({
            ...prev,
            attributes: {
              ...prev.attributes,
              [attribute]: baseValue - 1
            }
          }));
        }
      }
    };
    
    return (
      <ThemedView card style={styles.attributeBox}>
        <ThemedText type="title" style={styles.attributeLabel}>{label}</ThemedText>
        
        <View style={styles.attributeRow}>
          <TouchableOpacity 
            style={[styles.attributeButton, { backgroundColor: colors.danger }]}
            onPress={decrement}
          >
            <MaterialCommunityIcons name="minus" size={20} color="white" />
          </TouchableOpacity>
          
          <View style={styles.attributeValueContainer}>
            <ThemedText type="title" style={styles.attributeValue}>
              {totalValue}
            </ThemedText>
            {racialBonus > 0 && (
              <ThemedText style={styles.racialBonus}>(+{racialBonus})</ThemedText>
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.attributeButton, { backgroundColor: colors.primary }]}
            onPress={increment}
          >
            <MaterialCommunityIcons name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <ThemedText style={styles.modifier}>
          {formatModifier(modifier)}
        </ThemedText>
        
        <TouchableOpacity
          style={styles.savingThrowIndicator}
          onPress={() => {
            // Lógica para marcar/desmarcar tiradas de salvación
            if (character.proficiencies?.savingThrows) {
              const hasProficiency = character.proficiencies.savingThrows.includes(attribute);
              setCharacter(prev => ({
                ...prev,
                proficiencies: {
                  ...prev.proficiencies,
                  savingThrows: hasProficiency 
                    ? prev.proficiencies?.savingThrows?.filter(s => s !== attribute) 
                    : [...(prev.proficiencies?.savingThrows || []), attribute]
                }
              }));
            }
          }}
        >
          <ThemedText type="secondary" style={styles.savingThrowText}>
            Tirada de Salvación: {
              character.proficiencies?.savingThrows?.includes(attribute) 
                ? formatModifier(modifier + Math.ceil(1 + (character.basicInfo.level / 4)))
                : formatModifier(modifier)
            }
          </ThemedText>
          {character.proficiencies?.savingThrows?.includes(attribute) && (
            <MaterialCommunityIcons 
              name="check-circle" 
              size={16} 
              color={colors.primary} 
              style={styles.proficiencyIcon}
            />
          )}
        </TouchableOpacity>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedScrollView>
        <View style={styles.methodButtons}>
          <ThemedButton 
            title="Tirar Dados" 
            onPress={() => {
              setPointBuy(false);
              setStandardArray(false);
            }}
            variant={(!pointBuy && !standardArray) ? "primary" : "secondary"}
            style={styles.methodButton}
          />
          <ThemedButton 
            title="Point Buy" 
            onPress={() => {
              setPointBuy(true);
              setStandardArray(false);
              
              // Resetear los atributos a los valores iniciales para Point Buy
              setCharacter(prev => ({
                ...prev,
                attributes: {
                  strength: 8,
                  dexterity: 8,
                  constitution: 8,
                  intelligence: 8,
                  wisdom: 8,
                  charisma: 8
                }
              }));
              
              setPointsRemaining(27);
            }}
            variant={pointBuy ? "primary" : "secondary"}
            style={styles.methodButton}
          />
          <ThemedButton 
            title="Standard Array" 
            onPress={() => {
              setPointBuy(false);
              setStandardArray(true);
              
              // Resetear los atributos a 0 para Standard Array
              setCharacter(prev => ({
                ...prev,
                attributes: {
                  strength: 0,
                  dexterity: 0,
                  constitution: 0,
                  intelligence: 0,
                  wisdom: 0,
                  charisma: 0
                }
              }));
              
              setUsedStandardValues([]);
            }}
            variant={standardArray ? "primary" : "secondary"}
            style={styles.methodButton}
          />
        </View>
        
        {pointBuy && (
          <ThemedView card style={styles.pointBuyInfo}>
            <ThemedText type="title">Point Buy: {pointsRemaining} puntos restantes</ThemedText>
            <ThemedText type="secondary">
              Cada atributo comienza en 8 y puede aumentarse hasta 15 antes de aplicar bonificaciones raciales.
              Coste: 1 punto por cada nivel hasta 13, 2 puntos por nivel 14, 3 puntos por nivel 15.
            </ThemedText>
          </ThemedView>
        )}
        
        {standardArray && (
          <ThemedView card style={styles.pointBuyInfo}>
            <ThemedText type="title">Standard Array</ThemedText>
            <ThemedText type="secondary">
              Asigna estos valores a tus atributos: 15, 14, 13, 12, 10, 8
            </ThemedText>
            <View style={styles.standardArrayValues}>
              {standardValues.map(value => (
                <ThemedView 
                  key={value} 
                  style={[
                    styles.standardValue,
                    usedStandardValues.includes(value) ? { opacity: 0.5 } : {}
                  ]}
                >
                  <ThemedText>{value}</ThemedText>
                </ThemedView>
              ))}
            </View>
          </ThemedView>
        )}
        
        <View style={styles.attributesGrid}>
          <AttributeAdjuster attribute="strength" label="FUERZA" />
          <AttributeAdjuster attribute="dexterity" label="DESTREZA" />
          <AttributeAdjuster attribute="constitution" label="CONSTITUCIÓN" />
          <AttributeAdjuster attribute="intelligence" label="INTELIGENCIA" />
          <AttributeAdjuster attribute="wisdom" label="SABIDURÍA" />
          <AttributeAdjuster attribute="charisma" label="CARISMA" />
        </View>
      </ThemedScrollView>
      <SaveIndicator saving={isSaving} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  methodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  methodButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  pointBuyInfo: {
    margin: 16,
    padding: 12,
  },
  standardArrayValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  standardValue: {
    padding: 8,
    borderRadius: 20,
    minWidth: 36,
    alignItems: 'center',
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  attributeBox: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  attributeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  attributeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributeValueContainer: {
    alignItems: 'center',
  },
  attributeValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  racialBonus: {
    fontSize: 12,
  },
  modifier: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  savingThrowIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  savingThrowText: {
    fontSize: 12,
  },
  proficiencyIcon: {
    marginLeft: 4,
  }
});