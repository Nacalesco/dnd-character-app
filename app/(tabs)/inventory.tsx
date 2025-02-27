// app/(tabs)/inventory.tsx
import React from 'react';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView, ThemedScrollView, ThemedText, ThemedTextInput, ThemedButton } from '../../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';

type InventoryItem = {
  name: string;
  quantity: number;
  weight: number;
  description?: string;
};

export default function InventoryScreen() {
  const { character, setCharacter } = useCharacter();
  const { colors } = useTheme();

  const addItem = () => {
    setCharacter(prev => ({
      ...prev,
      inventory: [...(prev.inventory || []), { 
        name: '', 
        quantity: 1, 
        weight: 0,
        description: ''
      }]
    }));
  };

  const removeItem = (index: number) => {
    Alert.alert(
      "Eliminar objeto",
      "¿Estás seguro de que quieres eliminar este objeto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            const newInventory = [...(character.inventory || [])];
            newInventory.splice(index, 1);
            setCharacter(prev => ({ ...prev, inventory: newInventory }));
          },
          style: "destructive"
        }
      ]
    );
  };

  const updateItem = (index: number, updates: Partial<InventoryItem>) => {
    const newInventory = [...(character.inventory || [])];
    newInventory[index] = { ...newInventory[index], ...updates };
    setCharacter(prev => ({ ...prev, inventory: newInventory }));
  };

  const getTotalWeight = () => {
    return (character.inventory || []).reduce((total, item) => 
      total + (item.weight * item.quantity), 0
    );
  };

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView card style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          Peso Total: {getTotalWeight().toFixed(1)} lb
        </ThemedText>
      </ThemedView>

      {(character.inventory || []).map((item, index) => (
        <ThemedView key={index} card style={styles.itemContainer}>
          <View style={styles.itemRow}>
            <ThemedTextInput
              style={styles.nameInput}
              placeholder="Nombre del objeto"
              value={item.name}
              onChangeText={(text) => updateItem(index, { name: text })}
            />
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => removeItem(index)}
            >
              <MaterialCommunityIcons name="delete" size={24} color={colors.danger} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.quantityContainer}>
              <ThemedText type="secondary" style={styles.label}>Cantidad:</ThemedText>
              <ThemedTextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={item.quantity.toString()}
                onChangeText={(text) => 
                  updateItem(index, { quantity: parseInt(text) || 0 })
                }
              />
            </View>

            <View style={styles.weightContainer}>
              <ThemedText type="secondary" style={styles.label}>Peso (lb):</ThemedText>
              <ThemedTextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={item.weight.toString()}
                onChangeText={(text) => 
                  updateItem(index, { weight: parseFloat(text) || 0 })
                }
              />
            </View>
          </View>

          <ThemedTextInput
            style={styles.descriptionInput}
            placeholder="Descripción (opcional)"
            value={item.description}
            onChangeText={(text) => updateItem(index, { description: text })}
            multiline
          />
        </ThemedView>
      ))}

      <ThemedButton
        title="Añadir Objeto"
        onPress={addItem}
        style={styles.addButton}
        icon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
      />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 16,
    marginBottom: 16,
  },
  headerText: {
    textAlign: 'center',
  },
  itemContainer: {
    padding: 12,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quantityContainer: {
    flex: 1,
    marginRight: 8,
  },
  weightContainer: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  numberInput: {
    textAlign: 'center',
  },
  descriptionInput: {
    minHeight: 60,
  },
  addButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});