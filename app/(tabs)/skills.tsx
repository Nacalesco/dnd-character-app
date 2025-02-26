// app/tabs/skills.tsx
import React from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import { useCharacter } from '../context/CharacterContext';

type Skill = {
  name: string;
  attribute: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
  proficient: boolean;
  expertise: boolean;
};

export default function SkillsScreen() {
  const { character, setCharacter } = useCharacter();

  const skills: Record<string, Skill> = {
    'Acrobacias': { name: 'Acrobacias', attribute: 'dexterity', proficient: false, expertise: false },
    'Arcanos': { name: 'Arcanos', attribute: 'intelligence', proficient: false, expertise: false },
    'Atletismo': { name: 'Atletismo', attribute: 'strength', proficient: false, expertise: false },
    'Engaño': { name: 'Engaño', attribute: 'charisma', proficient: false, expertise: false },
    'Historia': { name: 'Historia', attribute: 'intelligence', proficient: false, expertise: false },
    'Interpretación': { name: 'Interpretación', attribute: 'charisma', proficient: false, expertise: false },
    'Intimidación': { name: 'Intimidación', attribute: 'charisma', proficient: false, expertise: false },
    'Investigación': { name: 'Investigación', attribute: 'intelligence', proficient: false, expertise: false },
    'Juego de Manos': { name: 'Juego de Manos', attribute: 'dexterity', proficient: false, expertise: false },
    'Medicina': { name: 'Medicina', attribute: 'wisdom', proficient: false, expertise: false },
    'Naturaleza': { name: 'Naturaleza', attribute: 'intelligence', proficient: false, expertise: false },
    'Percepción': { name: 'Percepción', attribute: 'wisdom', proficient: false, expertise: false },
    'Perspicacia': { name: 'Perspicacia', attribute: 'wisdom', proficient: false, expertise: false },
    'Persuasión': { name: 'Persuasión', attribute: 'charisma', proficient: false, expertise: false },
    'Religión': { name: 'Religión', attribute: 'intelligence', proficient: false, expertise: false },
    'Sigilo': { name: 'Sigilo', attribute: 'dexterity', proficient: false, expertise: false },
    'Supervivencia': { name: 'Supervivencia', attribute: 'wisdom', proficient: false, expertise: false },
    'Trato con Animales': { name: 'Trato con Animales', attribute: 'wisdom', proficient: false, expertise: false }
  };

  const calculateModifier = (attributeValue: number) => {
    return Math.floor((attributeValue - 10) / 2);
  };

  const getSkillModifier = (skill: Skill) => {
    const attributeValue = character.attributes[skill.attribute];
    const baseModifier = calculateModifier(attributeValue);
    const proficiencyBonus = Math.ceil(1 + (character.basicInfo.level / 4));
    
    if (character.skills?.[skill.name]?.expertise) {
      return baseModifier + (proficiencyBonus * 2);
    } else if (character.skills?.[skill.name]?.proficient) {
      return baseModifier + proficiencyBonus;
    }
    return baseModifier;
  };

  const toggleProficiency = (skillName: string, type: 'proficient' | 'expertise') => {
    setCharacter(prev => {
      const currentSkill = prev.skills?.[skillName] || { proficient: false, expertise: false };
      
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [skillName]: {
            proficient: type === 'proficient' ? !currentSkill.proficient : currentSkill.proficient,
            expertise: type === 'expertise' ? !currentSkill.expertise : currentSkill.expertise
          }
        }
      };
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Bonus de Competencia: +{Math.ceil(1 + (character.basicInfo.level / 4))}
        </Text>
      </View>

      {Object.values(skills).map((skill) => (
        <View key={skill.name} style={styles.skillRow}>
          <View style={styles.skillInfo}>
            <Text style={styles.skillName}>{skill.name}</Text>
            <Text style={styles.attributeName}>
              ({skill.attribute.charAt(0).toUpperCase() + skill.attribute.slice(1)})
            </Text>
            <Text style={styles.modifier}>
              {getSkillModifier(skill) >= 0 ? '+' : ''}{getSkillModifier(skill)}
            </Text>
          </View>
          
          <View style={styles.switchContainer}>
            <View style={styles.switchWrapper}>
              <Text style={styles.switchLabel}>Comp.</Text>
              <Switch
                value={character.skills?.[skill.name]?.proficient || false}
                onValueChange={() => toggleProficiency(skill.name, 'proficient')}
              />
            </View>
            <View style={styles.switchWrapper}>
              <Text style={styles.switchLabel}>Exp.</Text>
              <Switch
                value={character.skills?.[skill.name]?.expertise || false}
                onValueChange={() => toggleProficiency(skill.name, 'expertise')}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  skillInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  attributeName: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  modifier: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'right',
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
    color: '#6b7280',
    marginBottom: 4,
  },
});