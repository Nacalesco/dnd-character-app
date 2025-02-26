import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useCharacter } from '../context/CharacterContext';

export default function CombatScreen() {
  const { character, setCharacter } = useCharacter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.combatGrid}>
        <View style={styles.combatBox}>
          <Text style={styles.combatLabel}>Puntos de Vida</Text>
          <TextInput
            style={styles.combatInput}
            value={character.combat.hitPoints.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, hitPoints: parseInt(text) || 0 }
            })}
          />
        </View>

        <View style={styles.combatBox}>
          <Text style={styles.combatLabel}>Clase de Armadura</Text>
          <TextInput
            style={styles.combatInput}
            value={character.combat.armorClass.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, armorClass: parseInt(text) || 0 }
            })}
          />
        </View>

        <View style={styles.combatBox}>
          <Text style={styles.combatLabel}>Iniciativa</Text>
          <TextInput
            style={styles.combatInput}
            value={character.combat.initiative.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, initiative: parseInt(text) || 0 }
            })}
          />
        </View>

        <View style={styles.combatBox}>
          <Text style={styles.combatLabel}>Velocidad</Text>
          <TextInput
            style={styles.combatInput}
            value={character.combat.speed.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setCharacter({
              ...character,
              combat: { ...character.combat, speed: parseInt(text) || 0 }
            })}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  combatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  combatBox: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  combatLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  combatInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    width: 80,
    textAlign: 'center',
  },
});