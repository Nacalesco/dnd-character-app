// components/SkillSelectionComponent.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedView, ThemedText, ThemedButton } from './ThemedComponents';
import { useTheme } from '../app/context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definimos los tipos para los atributos y sus nombres
type AttributeKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

// Lista completa de habilidades en D&D 5e
export const allSkills = [
  { id: 'acrobatics', name: 'Acrobacias', attribute: 'dexterity' as AttributeKey },
  { id: 'animal_handling', name: 'Trato con Animales', attribute: 'wisdom' as AttributeKey },
  { id: 'arcana', name: 'Arcanos', attribute: 'intelligence' as AttributeKey },
  { id: 'athletics', name: 'Atletismo', attribute: 'strength' as AttributeKey },
  { id: 'deception', name: 'Engaño', attribute: 'charisma' as AttributeKey },
  { id: 'history', name: 'Historia', attribute: 'intelligence' as AttributeKey },
  { id: 'insight', name: 'Intuición', attribute: 'wisdom' as AttributeKey },
  { id: 'intimidation', name: 'Intimidación', attribute: 'charisma' as AttributeKey },
  { id: 'investigation', name: 'Investigación', attribute: 'intelligence' as AttributeKey },
  { id: 'medicine', name: 'Medicina', attribute: 'wisdom' as AttributeKey },
  { id: 'nature', name: 'Naturaleza', attribute: 'intelligence' as AttributeKey },
  { id: 'perception', name: 'Percepción', attribute: 'wisdom' as AttributeKey },
  { id: 'performance', name: 'Interpretación', attribute: 'charisma' as AttributeKey },
  { id: 'persuasion', name: 'Persuasión', attribute: 'charisma' as AttributeKey },
  { id: 'religion', name: 'Religión', attribute: 'intelligence' as AttributeKey },
  { id: 'sleight_of_hand', name: 'Juego de Manos', attribute: 'dexterity' as AttributeKey },
  { id: 'stealth', name: 'Sigilo', attribute: 'dexterity' as AttributeKey },
  { id: 'survival', name: 'Supervivencia', attribute: 'wisdom' as AttributeKey }
];

// Traducción de atributos
const attributeNames: Record<AttributeKey, string> = {
  strength: 'Fuerza',
  dexterity: 'Destreza',
  constitution: 'Constitución',
  intelligence: 'Inteligencia',
  wisdom: 'Sabiduría',
  charisma: 'Carisma'
};

interface SkillSelectionProps {
  availableSkills: string[]; // IDs de habilidades disponibles para seleccionar
  selectedSkills: string[]; // IDs de habilidades ya seleccionadas
  maxSelections: number; // Número máximo de habilidades para seleccionar
  backgroundSkills: string[]; // IDs de habilidades otorgadas por el trasfondo
  onSkillsSelected: (skills: string[]) => void; // Callback para actualizar las habilidades seleccionadas
  character: any; // Información del personaje para calcular los modificadores
}

export default function SkillSelectionComponent({
  availableSkills,
  selectedSkills,
  maxSelections,
  backgroundSkills,
  onSkillsSelected,
  character
}: SkillSelectionProps) {
  const { colors } = useTheme();
  const [localSelectedSkills, setLocalSelectedSkills] = useState<string[]>(selectedSkills);

  // Actualizar selección local cuando cambian las props
  useEffect(() => {
    setLocalSelectedSkills(selectedSkills);
  }, [selectedSkills]);

  // Calcular modificador de atributo
  const calculateModifier = (attribute: AttributeKey) => {
    const score = character.attributes[attribute];
    return Math.floor((score - 10) / 2);
  };

  // Formatear el modificador para mostrar
  const formatModifier = (value: number) => {
    return value >= 0 ? `+${value}` : `${value}`;
  };

  // Manejar la selección/deselección de una habilidad
  const toggleSkill = (skillId: string) => {
    if (backgroundSkills.includes(skillId)) {
      // No se puede deseleccionar una habilidad de trasfondo
      return;
    }

    if (localSelectedSkills.includes(skillId)) {
      // Deseleccionar
      setLocalSelectedSkills((prev) => prev.filter((id) => id !== skillId));
    } else {
      // Verificar si ya se alcanzó el máximo de selecciones
      if (
        localSelectedSkills.filter((id) => !backgroundSkills.includes(id)).length <
        maxSelections
      ) {
        // Seleccionar
        setLocalSelectedSkills((prev) => [...prev, skillId]);
      }
    }
  };

  // Aplicar selección de habilidades
  const applySelection = () => {
    onSkillsSelected(localSelectedSkills);
  };

  // Agrupar habilidades por atributo
  const skillsByAttribute = allSkills.reduce((acc, skill) => {
    if (!acc[skill.attribute]) {
      acc[skill.attribute] = [];
    }
    acc[skill.attribute].push(skill);
    return acc;
  }, {} as Record<AttributeKey, typeof allSkills>);

  const remainingSelections = maxSelections - 
    (localSelectedSkills.filter(id => !backgroundSkills.includes(id)).length);

  return (
    <ThemedView card style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Selección de Habilidades
      </ThemedText>
      
      <ThemedText style={styles.instructions}>
        Puedes seleccionar {maxSelections} habilidades de clase.
        {backgroundSkills.length > 0 && ` Ya tienes ${backgroundSkills.length} habilidades por tu trasfondo.`}
      </ThemedText>
      
      <ThemedText style={styles.remainingText}>
        Selecciones restantes: {remainingSelections}
      </ThemedText>

      <ScrollView style={styles.skillList}>
        {Object.entries(skillsByAttribute).map(([attributeKey, skills]) => {
          // Convertimos la clave a un AttributeKey seguro para TypeScript
          const attribute = attributeKey as AttributeKey;
          
          return (
            <View key={attribute} style={styles.attributeGroup}>
              <ThemedText type="title" style={styles.attributeTitle}>
                {attributeNames[attribute]} ({formatModifier(calculateModifier(attribute))})
              </ThemedText>

              {skills
                .filter((skill) => availableSkills.includes(skill.id))
                .map((skill) => {
                  const isSelected = localSelectedSkills.includes(skill.id);
                  const isBackgroundSkill = backgroundSkills.includes(skill.id);
                  
                  return (
                    <TouchableOpacity
                      key={skill.id}
                      style={[
                        styles.skillItem,
                        isSelected && {
                          backgroundColor: isBackgroundSkill
                            ? colors.primary + '40' // Transparente para trasfondo
                            : colors.primary + '20' // Más opaco para selección activa
                        }
                      ]}
                      onPress={() => toggleSkill(skill.id)}
                      disabled={isBackgroundSkill}
                    >
                      <View style={styles.skillNameContainer}>
                        <ThemedText style={styles.skillName}>
                          {skill.name}
                        </ThemedText>
                        {isBackgroundSkill && (
                          <ThemedText style={styles.backgroundTag}>Trasfondo</ThemedText>
                        )}
                      </View>
                      
                      <View style={styles.skillModifier}>
                        <ThemedText>
                          {formatModifier(
                            calculateModifier(skill.attribute) + 
                            (isSelected ? Math.ceil(1 + (character.basicInfo.level / 4)) : 0)
                          )}
                        </ThemedText>
                        {isSelected && (
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={20}
                            color={isBackgroundSkill ? colors.textSecondary : colors.primary}
                            style={styles.checkIcon}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          );
        })}
      </ScrollView>

      <ThemedButton
        title="Aplicar Selección"
        onPress={applySelection}
        style={styles.applyButton}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  instructions: {
    marginBottom: 12,
  },
  remainingText: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  skillList: {
    maxHeight: 400,
  },
  attributeGroup: {
    marginBottom: 16,
  },
  attributeTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  skillNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 15,
  },
  backgroundTag: {
    fontSize: 12,
    marginLeft: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillModifier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginLeft: 4,
  },
  applyButton: {
    marginTop: 16,
  }
});