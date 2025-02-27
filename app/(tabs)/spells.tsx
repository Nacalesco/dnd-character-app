// app/(tabs)/spells.tsx
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView, ThemedScrollView, ThemedText, ThemedTextInput, ThemedButton } from '../../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';

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
  const { colors } = useTheme();
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
    <ThemedView style={styles.spellSlotsContainer}>
      <ThemedText type="title" style={styles.sectionTitle}>Espacios de Hechizos</ThemedText>
      <View style={styles.slotsGrid}>
        {spellLevels.slice(1).map(level => (
          <View key={level} style={styles.slotItem}>
            <ThemedText>Nivel {level}</ThemedText>
            <ThemedTextInput
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
    </ThemedView>
  );

  return (
    <ThemedScrollView style={styles.container}>
      <SpellSlots />
      
      <View style={styles.levelSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {spellLevels.map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelButton,
                { 
                  backgroundColor: selectedLevel === level ? colors.primary : colors.card,
                  borderColor: colors.cardBorder
                }
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <ThemedText
                style={[
                  { color: selectedLevel === level ? '#FFFFFF' : colors.text }
                ]}
              >
                {level === 0 ? 'Trucos' : `Nivel ${level}`}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.spellList}>
        {(character.spells?.[selectedLevel] || []).map((spell, index) => (
          <ThemedView key={index} card style={styles.spellCard}>
            <View style={styles.spellHeader}>
              <ThemedTextInput
                style={styles.spellName}
                placeholder="Nombre del hechizo"
                value={spell.name}
                onChangeText={(text) => updateSpell(selectedLevel, index, { name: text })}
              />
              <TouchableOpacity
                onPress={() => removeSpell(selectedLevel, index)}
                style={styles.deleteButton}
              >
                <MaterialCommunityIcons name="delete" size={24} color={colors.danger} />
              </TouchableOpacity>
            </View>

            <View style={styles.spellDetails}>
              <View style={styles.detailRow}>
                <ThemedTextInput
                  style={styles.detailInput}
                  placeholder="Tiempo de lanzamiento"
                  value={spell.castingTime}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { castingTime: text })}
                />
                <ThemedTextInput
                  style={styles.detailInput}
                  placeholder="Alcance"
                  value={spell.range}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { range: text })}
                />
              </View>

              <View style={styles.detailRow}>
                <ThemedTextInput
                  style={styles.detailInput}
                  placeholder="Componentes"
                  value={spell.components}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { components: text })}
                />
                <ThemedTextInput
                  style={styles.detailInput}
                  placeholder="Duración"
                  value={spell.duration}
                  onChangeText={(text) => updateSpell(selectedLevel, index, { duration: text })}
                />
              </View>

              <ThemedTextInput
                style={styles.descriptionInput}
                placeholder="Descripción del hechizo"
                value={spell.description}
                onChangeText={(text) => updateSpell(selectedLevel, index, { description: text })}
                multiline
                numberOfLines={4}
              />
            </View>
          </ThemedView>
        ))}

        <ThemedButton
          title="Añadir Hechizo"
          onPress={() => addSpell(selectedLevel)}
          style={styles.addButton}
          icon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
        />
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spellSlotsContainer: {
    padding: 16,
  },
  sectionTitle: {
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
  slotInput: {
    width: 50,
    textAlign: 'center',
  },
  levelSelector: {
    padding: 16,
    borderBottomWidth: 1,
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  spellList: {
    padding: 16,
  },
  spellCard: {
    padding: 16,
    marginBottom: 16,
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
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    marginTop: 8,
  },
});