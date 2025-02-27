// app/(tabs)/combat.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import { ThemedView, ThemedScrollView, ThemedText, ThemedTextInput } from '../../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';

export default function CombatScreen() {
  const { character, setCharacter } = useCharacter();
  const { colors } = useTheme();

  return (
    <ThemedScrollView style={styles.container}>
      <View style={styles.combatGrid}>
        <ThemedView card style={styles.combatBox}>
          <ThemedText type="title" style={styles.combatLabel}>Puntos de Vida</ThemedText>
          <ThemedTextInput
            value={character.combat.hitPoints.toString()}
            keyboardType="numeric"
            style={styles.combatInput}
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, hitPoints: parseInt(text) || 0 }
            })}
          />
        </ThemedView>

        <ThemedView card style={styles.combatBox}>
          <ThemedText type="title" style={styles.combatLabel}>Clase de Armadura</ThemedText>
          <ThemedTextInput
            value={character.combat.armorClass.toString()}
            keyboardType="numeric"
            style={styles.combatInput}
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, armorClass: parseInt(text) || 0 }
            })}
          />
        </ThemedView>

        <ThemedView card style={styles.combatBox}>
          <ThemedText type="title" style={styles.combatLabel}>Iniciativa</ThemedText>
          <ThemedTextInput
            value={character.combat.initiative.toString()}
            keyboardType="numeric"
            style={styles.combatInput}
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, initiative: parseInt(text) || 0 }
            })}
          />
        </ThemedView>

        <ThemedView card style={styles.combatBox}>
          <ThemedText type="title" style={styles.combatLabel}>Velocidad</ThemedText>
          <ThemedTextInput
            value={character.combat.speed.toString()}
            keyboardType="numeric"
            style={styles.combatInput}
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, speed: parseInt(text) || 0 }
            })}
          />
        </ThemedView>
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  combatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  combatBox: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  combatLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  combatInput: {
    width: 80,
    textAlign: 'center',
  },
});