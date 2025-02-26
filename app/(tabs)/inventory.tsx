// app/tabs/inventory.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useCharacter } from '../context/CharacterContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type InventoryItem = {
  name: string;
  quantity: number;
  weight: number;
  description?: string;
};

export default function InventoryScreen() {
  const { character, setCharacter } = useCharacter();

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Peso Total: {getTotalWeight().toFixed(1)} lb
        </Text>
      </View>

      {(character.inventory || []).map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.itemRow}>
            <TextInput
              style={styles.nameInput}
              placeholder="Nombre del objeto"
              value={item.name}
              onChangeText={(text) => updateItem(index, { name: text })}
            />
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => removeItem(index)}
            >
              <MaterialCommunityIcons name="delete" size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.quantityContainer}>
              <Text style={styles.label}>Cantidad:</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={item.quantity.toString()}
                onChangeText={(text) => 
                  updateItem(index, { quantity: parseInt(text) || 0 })
                }
              />
            </View>

            <View style={styles.weightContainer}>
              <Text style={styles.label}>Peso (lb):</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={item.weight.toString()}
                onChangeText={(text) => 
                  updateItem(index, { weight: parseFloat(text) || 0 })
                }
              />
            </View>
          </View>

          <TextInput
            style={styles.descriptionInput}
            placeholder="Descripción (opcional)"
            value={item.description}
            onChangeText={(text) => updateItem(index, { description: text })}
            multiline
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Añadir Objeto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  deleteButton: {
    marginLeft: 8,
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
    color: '#64748b',
  },
  numberInput: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    textAlign: 'center',
  },
  descriptionInput: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 60,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 32,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});