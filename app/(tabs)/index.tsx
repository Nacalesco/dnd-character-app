import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import SaveIndicator from 'dnd-character-app/components/SaveIndicator';

export default function BasicScreen() {
  const { character, setCharacter, saveCharacter } = useCharacter();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    const saveTimeout = setTimeout(() => {
      saveCharacter(character);
      setIsSaving(false);
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [character]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={character.basicInfo.name}
            onChangeText={(text) => setCharacter({
              ...character,
              basicInfo: { ...character.basicInfo, name: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Clase</Text>
          <TextInput
            style={styles.input}
            value={character.basicInfo.class}
            onChangeText={(text) => setCharacter({
              ...character,
              basicInfo: { ...character.basicInfo, class: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Raza</Text>
          <TextInput
            style={styles.input}
            value={character.basicInfo.race}
            onChangeText={(text) => setCharacter({
              ...character,
              basicInfo: { ...character.basicInfo, race: text }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nivel</Text>
          <TextInput
            style={styles.input}
            value={character.basicInfo.level.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setCharacter({
              ...character,
              basicInfo: { ...character.basicInfo, level: parseInt(text) || 1 }
            })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Trasfondo</Text>
          <TextInput
            style={styles.input}
            value={character.basicInfo.background}
            onChangeText={(text) => setCharacter({
              ...character,
              basicInfo: { ...character.basicInfo, background: text }
            })}
          />
        </View>
      </ScrollView>
      <SaveIndicator saving={isSaving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 16,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});