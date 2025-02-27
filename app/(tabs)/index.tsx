// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import SaveIndicator from '../../components/SaveIndicator';
import { ThemedView, ThemedScrollView, ThemedText, ThemedTextInput, ThemedButton } from '../../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { races, classes, backgrounds } from '../data/dnd5eData';
import SkillSelectionComponent, { allSkills } from '../../components/SkillSelectionComponent';

// Definimos interfaces para las estructuras de datos
interface Race {
  id: string;
  name: string;
  abilityScores: Record<string, any>;
  features: Array<{name: string, description: string}>;
  subraces?: Array<{
    id: string;
    name: string;
    abilityScores?: Record<string, any>;
    features: Array<{name: string, description: string}>;
  }>;
  [key: string]: any;
}

interface Class {
  id: string;
  name: string;
  hitDie: string;
  features: Array<{name: string, description: string, level: number}>;
  skillChoices?: {
    count: number;
    options: string[] | 'any';
  };
  [key: string]: any;
}

interface Background {
  id: string;
  name: string;
  skillProficiencies: string[];
  feature: {name: string, description: string};
  [key: string]: any;
}

// Define el tipo de atributos
type AttributeKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export default function BasicScreen() {
  const { character, setCharacter, saveCharacter } = useCharacter();
  const { colors } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedRace, setSelectedRace] = useState(character.basicInfo.race || '');
  const [selectedSubrace, setSelectedSubrace] = useState('');
  const [selectedClass, setSelectedClass] = useState(character.basicInfo.class || '');
  const [selectedBackground, setSelectedBackground] = useState(character.basicInfo.background || '');
  
  // Estado para el modal de selección de habilidades
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [skillSelections, setSkillSelections] = useState<string[]>([]);
  const [maxSkillSelections, setMaxSkillSelections] = useState(0);
  const [backgroundSkills, setBackgroundSkills] = useState<string[]>([]);

  useEffect(() => {
    setIsSaving(true);
    const saveTimeout = setTimeout(() => {
      saveCharacter(character);
      setIsSaving(false);
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [character]);

  // Encuentra la raza seleccionada en la base de datos
  const findRace = (raceId: string): Race | undefined => {
    return races.find(race => race.name === raceId || race.id === raceId) as Race | undefined;
  };

  // Encuentra la clase seleccionada en la base de datos
  const findClass = (classId: string): Class | undefined => {
    return classes.find(cls => cls.name === classId || cls.id === classId) as Class | undefined;
  };

  // Encuentra el trasfondo seleccionado en la base de datos
  const findBackground = (backgroundId: string): Background | undefined => {
    return backgrounds.find(bg => bg.name === backgroundId || bg.id === backgroundId) as Background | undefined;
  };

  // Actualiza estadísticas del personaje basadas en la raza
  const updateRaceStats = (raceId: string) => {
    const race = findRace(raceId);
    if (!race) return;

    // Resetear bonificaciones de atributos antes de aplicar las nuevas
    const resetAttributes = { ...character.attributes };
    
    // Aplicar bonificaciones raciales
    if (race.abilityScores) {
      const newAttributes = { ...resetAttributes };
      
      // Aplicar bonificaciones básicas de la raza
      Object.entries(race.abilityScores).forEach(([ability, value]) => {
        if (ability !== 'choice' && typeof value === 'number') {
          // Solo modificar si es un atributo válido y el valor es un número
          if (ability in newAttributes) {
            (newAttributes as Record<string, number>)[ability] = ((newAttributes as Record<string, number>)[ability] || 10) + value;
          }
        }
      });
      
      // Si hay subraza seleccionada, aplicar sus bonificaciones también
      if (selectedSubrace) {
        const subrace = race.subraces?.find(sub => sub.id === selectedSubrace || sub.name === selectedSubrace);
        if (subrace && subrace.abilityScores) {
          Object.entries(subrace.abilityScores).forEach(([ability, value]) => {
            if (ability !== 'choice' && typeof value === 'number') {
              if (ability in newAttributes) {
                (newAttributes as Record<string, number>)[ability] = ((newAttributes as Record<string, number>)[ability] || 10) + value;
              }
            }
          });
        }
      }

      setCharacter(prev => ({
        ...prev,
        attributes: newAttributes,
        basicInfo: {
          ...prev.basicInfo,
          race: race.name
        }
      }));
    }
  };

  // Actualiza estadísticas del personaje basadas en la clase
  const updateClassStats = (classId: string) => {
    const characterClass = findClass(classId);
    if (!characterClass) return;

    // Actualizar estadísticas basadas en la clase
    const hitDieValue = parseInt(characterClass.hitDie.substring(1));
    
    setCharacter(prev => ({
      ...prev,
      combat: {
        ...prev.combat,
        hitPoints: hitDieValue + Math.floor((prev.attributes.constitution - 10) / 2)
      },
      basicInfo: {
        ...prev.basicInfo,
        class: characterClass.name
      }
    }));
    
    // Preparar la selección de habilidades para la clase
    if (characterClass.skillChoices) {
      setMaxSkillSelections(characterClass.skillChoices.count);
      
      if (characterClass.skillChoices.options === 'any') {
        // Todas las habilidades están disponibles
        setAvailableSkills(allSkills.map(skill => skill.id));
      } else {
        // Solo las habilidades específicas de la clase
        setAvailableSkills(characterClass.skillChoices.options);
      }
    }
  };

  // Actualiza estadísticas del personaje basadas en el trasfondo
  const updateBackgroundStats = (backgroundId: string) => {
    const background = findBackground(backgroundId);
    if (!background) return;

    // Actualizar habilidades basadas en el trasfondo
    if (background.skillProficiencies) {
      const newSkills: Record<string, { proficient: boolean, expertise: boolean }> = {};
      
      // Convertir los nombres de habilidades a IDs
      const backgroundSkillIds = background.skillProficiencies.map(skillName => {
        const skill = allSkills.find(s => s.name === skillName);
        return skill ? skill.id : skillName.toLowerCase().replace(/ /g, '_');
      });
      
      setBackgroundSkills(backgroundSkillIds);
      
      // Aplicar las competencias del trasfondo
      backgroundSkillIds.forEach(skillId => {
        newSkills[skillId] = {
          proficient: true,
          expertise: false
        };
      });

      setCharacter(prev => ({
        ...prev,
        skills: newSkills,
        basicInfo: {
          ...prev.basicInfo,
          background: background.name
        }
      }));
      
      // Actualizar las habilidades seleccionadas para incluir las del trasfondo
      setSkillSelections(backgroundSkillIds);
    }
  };

  // Aplicar las habilidades seleccionadas al personaje
  const applySkillSelections = (selectedSkillIds: string[]) => {
    const newSkills: Record<string, { proficient: boolean, expertise: boolean }> = {};
    
    selectedSkillIds.forEach(skillId => {
      newSkills[skillId] = {
        proficient: true,
        expertise: false
      };
    });
    
    setCharacter(prev => ({
      ...prev,
      skills: newSkills
    }));
    
    setSkillSelections(selectedSkillIds);
    setShowSkillModal(false);
  };

  // Manejadores de cambios
  const handleRaceChange = (raceId: string) => {
    setSelectedRace(raceId);
    setSelectedSubrace('');
    updateRaceStats(raceId);
  };

  const handleSubraceChange = (subraceId: string) => {
    setSelectedSubrace(subraceId);
    // Re-aplicar actualizaciones de raza con la nueva subraza
    updateRaceStats(selectedRace);
  };

  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
    updateClassStats(classId);
  };

  const handleBackgroundChange = (backgroundId: string) => {
    setSelectedBackground(backgroundId);
    updateBackgroundStats(backgroundId);
  };

  // Obtener subraces si la raza seleccionada las tiene
  const getSubraces = () => {
    const race = findRace(selectedRace);
    return race?.subraces || [];
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedScrollView>
        <View style={styles.inputGroup}>
          <ThemedText type="title" style={styles.label}>Nombre</ThemedText>
          <ThemedTextInput
            value={character.basicInfo.name}
            onChangeText={(text) => setCharacter({
              ...character,
              basicInfo: { ...character.basicInfo, name: text }
            })}
            placeholder="Nombre de tu personaje"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="title" style={styles.label}>Raza</ThemedText>
          <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Picker
              selectedValue={selectedRace}
              onValueChange={(itemValue) => handleRaceChange(itemValue as string)}
              style={{ color: colors.text }}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label="Selecciona una raza" value="" />
              {races.map(race => (
                <Picker.Item key={race.id} label={race.name} value={race.id} />
              ))}
            </Picker>
          </View>
          
          {getSubraces().length > 0 && (
            <>
              <ThemedText type="title" style={styles.label}>Subraza</ThemedText>
              <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <Picker
                  selectedValue={selectedSubrace}
                  onValueChange={(itemValue) => handleSubraceChange(itemValue as string)}
                  style={{ color: colors.text }}
                  dropdownIconColor={colors.text}
                >
                  <Picker.Item label="Selecciona una subraza" value="" />
                  {getSubraces().map(subrace => (
                    <Picker.Item key={subrace.id} label={subrace.name} value={subrace.id} />
                  ))}
                </Picker>
              </View>
            </>
          )}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="title" style={styles.label}>Clase</ThemedText>
          <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Picker
              selectedValue={selectedClass}
              onValueChange={(itemValue) => handleClassChange(itemValue as string)}
              style={{ color: colors.text }}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label="Selecciona una clase" value="" />
              {classes.map(cls => (
                <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="title" style={styles.label}>Trasfondo</ThemedText>
          <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Picker
              selectedValue={selectedBackground}
              onValueChange={(itemValue) => handleBackgroundChange(itemValue as string)}
              style={{ color: colors.text }}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label="Selecciona un trasfondo" value="" />
              {backgrounds.map(bg => (
                <Picker.Item key={bg.id} label={bg.name} value={bg.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="title" style={styles.label}>Nivel</ThemedText>
          <ThemedTextInput
            value={character.basicInfo.level.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setCharacter({
              ...character,
              basicInfo: { ...character.basicInfo, level: parseInt(text) || 1 }
            })}
          />
        </View>
        
        {selectedClass && availableSkills.length > 0 && (
          <View style={styles.skillSelectionContainer}>
            <ThemedText type="title">Habilidades</ThemedText>
            <ThemedText style={styles.skillSummary}>
              {backgroundSkills.length > 0 
                ? `Has obtenido ${backgroundSkills.length} habilidades de tu trasfondo. ` 
                : ''}
              {maxSkillSelections > 0 
                ? `Puedes elegir ${maxSkillSelections} habilidades adicionales de tu clase.` 
                : ''}
            </ThemedText>
            <ThemedButton
              title="Seleccionar Habilidades"
              onPress={() => setShowSkillModal(true)}
              style={styles.skillButton}
            />
            
            {skillSelections.length > 0 && (
              <View style={styles.selectedSkillsList}>
                <ThemedText type="subtitle">Habilidades seleccionadas:</ThemedText>
                {skillSelections.map(skillId => {
                  const skill = allSkills.find(s => s.id === skillId);
                  return (
                    <ThemedText key={skillId} style={styles.selectedSkill}>
                      • {skill?.name || skillId}
                      {backgroundSkills.includes(skillId) ? ' (Trasfondo)' : ''}
                    </ThemedText>
                  );
                })}
              </View>
            )}
          </View>
        )}

        {selectedRace && (
          <View style={styles.infoSection}>
            <ThemedText type="title">Rasgos Raciales</ThemedText>
            {findRace(selectedRace)?.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <ThemedText style={styles.featureName}>{feature.name}</ThemedText>
                <ThemedText type="secondary">{feature.description}</ThemedText>
              </View>
            ))}
            {selectedSubrace && findRace(selectedRace)?.subraces?.find(sub => sub.id === selectedSubrace)?.features.map((feature, index) => (
              <View key={`subrace-${index}`} style={styles.featureItem}>
                <ThemedText style={styles.featureName}>{feature.name} (Subraza)</ThemedText>
                <ThemedText type="secondary">{feature.description}</ThemedText>
              </View>
            ))}
          </View>
        )}

        {selectedClass && (
          <View style={styles.infoSection}>
            <ThemedText type="title">Rasgos de Clase</ThemedText>
            {findClass(selectedClass)?.features
              .filter(feature => feature.level <= character.basicInfo.level)
              .map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <ThemedText style={styles.featureName}>{feature.name} (Nivel {feature.level})</ThemedText>
                  <ThemedText type="secondary">{feature.description}</ThemedText>
                </View>
              ))}
          </View>
        )}

        {selectedBackground && (
          <View style={styles.infoSection}>
            <ThemedText type="title">Rasgo de Trasfondo</ThemedText>
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureName}>{findBackground(selectedBackground)?.feature.name}</ThemedText>
              <ThemedText type="secondary">{findBackground(selectedBackground)?.feature.description}</ThemedText>
            </View>
          </View>
        )}
      </ThemedScrollView>
      
      {/* Modal para selección de habilidades */}
      <Modal
        visible={showSkillModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSkillModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SkillSelectionComponent
              availableSkills={availableSkills}
              selectedSkills={skillSelections}
              maxSelections={maxSkillSelections}
              backgroundSkills={backgroundSkills}
              onSkillsSelected={applySkillSelections}
              character={character}
            />
            <ThemedButton
              title="Cerrar"
              onPress={() => setShowSkillModal(false)}
              variant="secondary"
              style={styles.closeButton}
            />
          </View>
        </View>
      </Modal>
      
      <SaveIndicator saving={isSaving} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
    padding: 16,
  },
  label: {
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  skillSelectionContainer: {
    padding: 16,
    marginBottom: 16,
  },
  skillSummary: {
    marginVertical: 8,
  },
  skillButton: {
    marginTop: 8,
  },
  selectedSkillsList: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  selectedSkill: {
    marginVertical: 4,
  },
  infoSection: {
    padding: 16,
    marginBottom: 16,
  },
  featureItem: {
    marginTop: 12,
    marginBottom: 8,
  },
  featureName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 8,
  }
});