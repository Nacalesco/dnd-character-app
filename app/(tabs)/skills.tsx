// app/(tabs)/skills.tsx
import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import { ThemedView, ThemedScrollView, ThemedText } from '../../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';
import { allSkills } from '../../components/SkillSelectionComponent';

type AttributeKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export default function SkillsScreen() {
  const { character, setCharacter } = useCharacter();
  const { colors } = useTheme();

  // Cálculo del modificador de atributo según las reglas de D&D 5e
  const calculateModifier = (attributeValue: number) => {
    return Math.floor((attributeValue - 10) / 2);
  };

  // Bonus por competencia según el nivel
  const getProficiencyBonus = () => {
    return Math.ceil(1 + (character.basicInfo.level / 4));
  };

  // Obtener el modificador para una habilidad específica
  const getSkillModifier = (skillId: string) => {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return 0;

    const attributeValue = character.attributes[skill.attribute as AttributeKey];
    const baseModifier = calculateModifier(attributeValue);
    const proficiencyBonus = getProficiencyBonus();
    
    if (character.skills?.[skillId]?.expertise) {
      return baseModifier + (proficiencyBonus * 2);
    } else if (character.skills?.[skillId]?.proficient) {
      return baseModifier + proficiencyBonus;
    }
    return baseModifier;
  };

  // Formatear el modificador para mostrarlo con signo
  const formatModifier = (mod: number) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  // Alternar entre competencia y expertise
  const toggleProficiency = (skillId: string, type: 'proficient' | 'expertise') => {
    setCharacter(prev => {
      const currentSkill = prev.skills?.[skillId] || { proficient: false, expertise: false };
      
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [skillId]: {
            proficient: type === 'proficient' ? !currentSkill.proficient : currentSkill.proficient,
            expertise: type === 'expertise' ? !currentSkill.expertise : currentSkill.expertise
          }
        }
      };
    });
  };

  // Agrupar habilidades por atributo
  const skillsByAttribute = allSkills.reduce((acc, skill) => {
    if (!acc[skill.attribute]) {
      acc[skill.attribute] = [];
    }
    acc[skill.attribute].push(skill);
    return acc;
  }, {} as Record<string, typeof allSkills>);

  // Nombres de atributos para mostrar en la UI
  const attributeNames = {
    strength: 'Fuerza',
    dexterity: 'Destreza',
    constitution: 'Constitución',
    intelligence: 'Inteligencia',
    wisdom: 'Sabiduría',
    charisma: 'Carisma'
  };

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.headerText}>
          Bonus de Competencia: +{getProficiencyBonus()}
        </ThemedText>
      </ThemedView>

      {Object.entries(skillsByAttribute).map(([attribute, skills]) => (
        <View key={attribute} style={styles.attributeGroup}>
          <ThemedView style={styles.attributeHeader}>
            <ThemedText type="title">
              {attributeNames[attribute as keyof typeof attributeNames]} 
              ({formatModifier(calculateModifier(character.attributes[attribute as AttributeKey]))})
            </ThemedText>
          </ThemedView>

          {skills.map((skill) => (
            <ThemedView key={skill.id} style={styles.skillRow}>
              <View style={styles.skillInfo}>
                <ThemedText style={styles.skillName}>{skill.name}</ThemedText>
                <ThemedText type="title" style={styles.modifier}>
                  {formatModifier(getSkillModifier(skill.id))}
                </ThemedText>
              </View>
              
              <View style={styles.switchContainer}>
                <View style={styles.switchWrapper}>
                  <ThemedText type="secondary" style={styles.switchLabel}>Comp.</ThemedText>
                  <Switch
                    value={character.skills?.[skill.id]?.proficient || false}
                    onValueChange={() => toggleProficiency(skill.id, 'proficient')}
                    trackColor={{ false: colors.switchTrack, true: colors.primary }}
                    thumbColor="#ffffff"
                  />
                </View>
                <View style={styles.switchWrapper}>
                  <ThemedText type="secondary" style={styles.switchLabel}>Exp.</ThemedText>
                  <Switch
                    value={character.skills?.[skill.id]?.expertise || false}
                    onValueChange={() => toggleProficiency(skill.id, 'expertise')}
                    trackColor={{ false: colors.switchTrack, true: colors.primary }}
                    thumbColor="#ffffff"
                    disabled={!character.skills?.[skill.id]?.proficient}
                  />
                </View>
              </View>
            </ThemedView>
          ))}
        </View>
      ))}
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerText: {
    textAlign: 'center',
  },
  attributeGroup: {
    marginBottom: 16,
  },
  attributeHeader: {
    padding: 12,
    borderBottomWidth: 1,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  skillInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skillName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  modifier: {
    fontSize: 16,
    minWidth: 40,
    textAlign: 'right',
    marginRight: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchWrapper: {
    alignItems: 'center',
    marginLeft: 16,
  },
  switchLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
});