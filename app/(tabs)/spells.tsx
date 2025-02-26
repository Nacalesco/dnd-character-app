// app/tabs/spells.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Spell = {
  name: string;
  level: number;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  prepared: boolean;
};

export default function SpellsScreen() {
  const { character, setCharacter } = useCharacter();
  const [selectedLevel, setSelectedLevel] = useState(0);

  const spellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const addSpell = (level: number) => {
    const newSpell: Spell = {
      name: '',
      level,
      castingTime: '',
      range: '',
      components: '',
      duration: '',
      description: '',
      prepared: false,
    };

    setCharacter(prev => ({
      ...prev,
      spells: {
        ...prev.spells,
        [level]: [...(prev.spells?.[level] || []), newSpell]
      }
    }));
  };

  const updateSpell = (level: number, index: number, updates: Partial<Spell>) => {
    setCharacter(prev => {
      const spellsAtLevel = [...(prev.spells?.[level] || [])];
      spellsAtLevel[index] = { ...spellsAtLevel[index], ...updates };
      
      return {
        ...prev,
        spells: {
          ...prev.spells,
          [level]: spellsAtLevel
        }
      };
    });
  };

  const removeSpell = (level: number, index: number) => {
    Alert.alert(
      "Eliminar hechizo",
      "¿Estás seguro de que quieres eliminar este hechizo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setCharacter(prev => {
              const spellsAtLevel = [...(prev.spells?.[level] || [])];
              spellsAtLevel.splice(index, 1);
              return {
                ...prev,
                spells: {
                  ...prev.spells,
                  [level]: spellsAtLevel
                }
              };
            });
          }
        }
      ]
    );
  };

  const SpellSlots = () => (
    <View style={styles.spellSlotsContainer}>
      <Text style={styles.sectionTitle}>Espacios de Hechizos</Text>
      <View style={styles.slotsGrid}>
        {spellLevels.slice(1).map(level => (
          <View key={level} style={styles.slotItem}>
            <Text style={styles.slotLevel}>Nivel {level}</Text>
            <TextInput
              style={styles.slotInput}
              keyboardType="numeric"
              placeholder="0"
              value={character.spellSlots?.[level]?.toString() || '0'}
              onChangeText={(value) => setCharacter(prev => ({
                ...prev,
                spellSlots: {
                  ...prev.spellSlots,
                  [level]: parseInt(value) || 0
                }
              }))}
            />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <SpellSlots />
      
      <View style={styles.levelSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {spellLevels.map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelButton,
                selectedLevel === level && styles.levelButtonSelected
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[
                styles.levelButtonText,
                selectedLevel === level && styles.levelButtonTextSelected
              ]}>
                {level === 0 ? 'Trucos' : `Nivel ${level}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.spellList}>
        {(character.spells?.[selectedLevel] || []).map((spell, index) => (
          <View key={index} style={styles.spellCard}>
            <View style={styles.spellHeader}>
              <TextInput
                style={styles.spellName}
                placeholder="Nombre del hechizo"
                value={spell.name}
                onChangeText={(text) => updateSpell(selectedLevel, index, { name: text })}
              />
              <TouchableOpacity
                onPress={() => removeSpell(selectedLevel, index)}
                style={styles.deleteButton}
              >
                <MaterialCommunityIcons name="delete" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.spellDetails}>
              <View style={styles.detailRow}>
                <TextInput
                  style={styles.detailInput}
                  placeholder="Tiempo de lanzamiento"
                  value={spell.castingTime}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { castingTime: text })}
                />
                <TextInput
                  style={styles.detailInput}
                  placeholder="Alcance"
                  value={spell.range}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { range: text })}
                />
              </View>

              <View style={styles.detailRow}>
                <TextInput
                  style={styles.detailInput}
                  placeholder="Componentes"
                  value={spell.components}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { components: text })}
                />
                <TextInput
                  style={styles.detailInput}
                  placeholder="Duración"
                  value={spell.duration}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { duration: text })}
                />
              </View>

              <TextInput
                style={styles.descriptionInput}
                placeholder="Descripción del hechizo"
                value={spell.description}
                onChangeText={(text) => updateSpell(selectedLevel, index, { description: text })}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addSpell(selectedLevel)}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text style={styles.addButtonText}>Añadir Hechizo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spellSlotsContainer: {
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotItem: {
    width: '30%',
    marginBottom: 12,
    alignItems: 'center',
  },
  slotLevel: {
    fontSize: 14,
    marginBottom: 4,
  },
  slotInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    width: 50,
    textAlign: 'center',
  },
  levelSelector: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f3f4f6',
  },
  levelButtonSelected: {
    backgroundColor: '#6366f1',
  },
  levelButtonText: {
    fontSize: 16,
    color: '#4b5563',
  },
  levelButtonTextSelected: {
    color: 'white',
  },
  spellList: {
    padding: 16,
  },
  spellCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  spellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  spellName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  spellDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  detailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'white',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'white',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});