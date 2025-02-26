import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import SaveIndicator from 'dnd-character-app/components/SaveIndicator';

export default function AttributesScreen() {
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

  const calculateModifier = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.attributesGrid}>
          {Object.entries(character.attributes).map(([attr, value]) => (
            <View key={attr} style={styles.attributeBox}>
              <Text style={styles.attributeLabel}>{attr.toUpperCase()}</Text>
              <Text style={styles.attributeValue}>{value}</Text>
              <Text style={styles.modifier}>
                {calculateModifier(value) >= 0 ? '+' : ''}{calculateModifier(value)}
              </Text>
              <TextInput
                style={styles.attributeInput}
                value={value.toString()}
                keyboardType="numeric"
                onChangeText={(text) => setCharacter({
                  ...character,
                  attributes: {
                    ...character.attributes,
                    [attr]: parseInt(text) || 0
                  }
                })}
              />
            </View>
          ))}
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
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  attributeBox: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  attributeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  attributeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  modifier: {
    fontSize: 16,
    color: '#666',
  },
  attributeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    width: 60,
    textAlign: 'center',
    marginTop: 8,
  },
});