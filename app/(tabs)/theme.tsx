// app/(tabs)/theme.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Switch,
  Modal,
  FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView, ThemedScrollView, ThemedText, ThemedTextInput, ThemedButton } from '../../components/ThemedComponents';
import { 
  useTheme, 
  ThemeType, 
  CharacterClassTheme, 
  CharacterRaceTheme,
  classThemes,
  raceThemes,
  ThemeColors,
  lightTheme,
  darkTheme
} from '../context/ThemeContext';
import { useCharacter } from '../context/CharacterContext';
import ColorPicker from 'react-native-wheel-color-picker';

// Componente para mostrar un preview de un tema
const ThemePreview = ({ 
  label,
  colors,
  selected = false,
  onPress
}: { 
  label: string; 
  colors: ThemeColors; 
  selected?: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.themePreview, 
        { borderColor: selected ? colors.primary : '#ddd', borderWidth: selected ? 3 : 1 }
      ]}
      onPress={onPress}
    >
      <View style={[styles.previewHeader, { backgroundColor: colors.card }]}>
        <View style={[styles.previewDot, { backgroundColor: colors.primary }]} />
        <View style={[styles.previewLine, { backgroundColor: colors.text }]} />
      </View>
      <View style={[styles.previewBody, { backgroundColor: colors.background }]}>
        <View style={[styles.previewCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={[styles.previewButton, { backgroundColor: colors.primary }]} />
          <View style={[styles.previewText, { backgroundColor: colors.text, opacity: 0.7 }]} />
        </View>
      </View>
      <ThemedText style={styles.previewLabel}>{label}</ThemedText>
    </TouchableOpacity>
  );
};

// Componente para la creación o edición de un tema personalizado
const CustomThemeEditor = ({
  visible,
  onClose,
  initialTheme,
  onSave
}: {
  visible: boolean;
  onClose: () => void;
  initialTheme?: { name: string; colors: ThemeColors };
  onSave: (name: string, colors: ThemeColors) => void;
}) => {
  const { colors } = useTheme();
  const [themeName, setThemeName] = useState('');
  const [primaryColor, setPrimaryColor] = useState(lightTheme.primary);
  const [color, setColor] = useState(primaryColor);
  const [editingColor, setEditingColor] = useState<'primary' | 'success' | 'danger' | null>(null);
  const [themeColors, setThemeColors] = useState<ThemeColors>({...lightTheme});

  // Inicializar estados si hay un tema inicial
  useEffect(() => {
    if (initialTheme) {
      setThemeName(initialTheme.name);
      setThemeColors(initialTheme.colors);
      setPrimaryColor(initialTheme.colors.primary);
    } else {
      setThemeName('');
      setThemeColors({...lightTheme});
      setPrimaryColor(lightTheme.primary);
    }
  }, [initialTheme, visible]);

  // Actualizar color actual cuando cambia el color que se está editando
  useEffect(() => {
    if (editingColor === 'primary') {
      setColor(themeColors.primary);
    } else if (editingColor === 'success') {
      setColor(themeColors.success);
    } else if (editingColor === 'danger') {
      setColor(themeColors.danger);
    }
  }, [editingColor, themeColors]);

  // Manejar cambio de color
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    
    if (editingColor === 'primary') {
      setThemeColors(prev => ({ ...prev, primary: newColor }));
    } else if (editingColor === 'success') {
      setThemeColors(prev => ({ ...prev, success: newColor }));
    } else if (editingColor === 'danger') {
      setThemeColors(prev => ({ ...prev, danger: newColor }));
    }
  };

  // Guardar el tema personalizado
  const saveTheme = () => {
    if (!themeName.trim()) {
      Alert.alert('Error', 'Por favor, introduce un nombre para el tema.');
      return;
    }
    
    onSave(themeName, themeColors);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView card style={styles.editorContainer}>
          <View style={styles.editorHeader}>
            <ThemedText type="title" style={styles.editorTitle}>Editor de Tema</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.editorScroll} contentContainerStyle={styles.editorContent}>
            <ThemedText type="subtitle" style={styles.editorLabel}>Nombre del Tema</ThemedText>
            <ThemedTextInput
              value={themeName}
              onChangeText={setThemeName}
              placeholder="Introduce un nombre"
              style={styles.editorInput}
            />
            
            <ThemedText type="subtitle" style={styles.editorLabel}>Vista Previa</ThemedText>
            <View style={styles.previewContainer}>
              <ThemePreview 
                label="Vista Previa" 
                colors={themeColors}
                onPress={() => {}}
              />
            </View>
            
            <ThemedText type="subtitle" style={styles.editorLabel}>Colores</ThemedText>
            
            <View style={styles.colorButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  { 
                    backgroundColor: themeColors.primary,
                    borderColor: editingColor === 'primary' ? colors.text : 'transparent',
                    borderWidth: editingColor === 'primary' ? 2 : 0
                  }
                ]}
                onPress={() => setEditingColor('primary')}
              >
                <ThemedText style={styles.colorButtonText}>Principal</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  { 
                    backgroundColor: themeColors.success,
                    borderColor: editingColor === 'success' ? colors.text : 'transparent',
                    borderWidth: editingColor === 'success' ? 2 : 0
                  }
                ]}
                onPress={() => setEditingColor('success')}
              >
                <ThemedText style={styles.colorButtonText}>Éxito</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  { 
                    backgroundColor: themeColors.danger,
                    borderColor: editingColor === 'danger' ? colors.text : 'transparent',
                    borderWidth: editingColor === 'danger' ? 2 : 0
                  }
                ]}
                onPress={() => setEditingColor('danger')}
              >
                <ThemedText style={styles.colorButtonText}>Peligro</ThemedText>
              </TouchableOpacity>
            </View>
            
            {editingColor && (
              <View style={styles.colorPickerContainer}>
                <ThemedText type="subtitle" style={styles.pickerTitle}>
                  {editingColor === 'primary' ? 'Color Principal' : 
                   editingColor === 'success' ? 'Color de Éxito' : 'Color de Peligro'}
                </ThemedText>
                <View style={styles.colorPicker}>
                  <ColorPicker
                    color={color}
                    onColorChange={handleColorChange}
                    thumbSize={30}
                    sliderSize={30}
                    noSnap={true}
                    row={false}
                  />
                </View>
              </View>
            )}
          </ScrollView>
          
          <View style={styles.editorActions}>
            <TouchableOpacity
              style={[styles.editorButton, styles.cancelButton, { borderColor: colors.primary }]}
              onPress={onClose}
            >
              <ThemedText style={[styles.buttonText, { color: colors.primary }]}>Cancelar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editorButton, styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={saveTheme}
            >
              <ThemedText style={styles.saveButtonText}>Guardar</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};

export default function ThemeScreen() {
  const { 
    colors, 
    isDarkMode, 
    toggleTheme, 
    themeType, 
    setThemeType,
    setClassTheme,
    setRaceTheme,
    customThemes,
    addCustomTheme,
    deleteCustomTheme,
    setCustomTheme,
    currentThemeName
  } = useTheme();
  
  const { character } = useCharacter();
  
  const [editorVisible, setEditorVisible] = useState(false);
  const [editingTheme, setEditingTheme] = useState<{ name: string; colors: ThemeColors } | undefined>(undefined);
  
  // Obtener la clase y raza del personaje actual
  const characterClass = character.basicInfo.class?.toLowerCase() as CharacterClassTheme;
  const characterRace = character.basicInfo.race?.toLowerCase() as CharacterRaceTheme;
  
  // Determinar si un tema está seleccionado
  const isThemeSelected = (themeId: string): boolean => {
    if (themeType === 'system' && themeId === 'system') return true;
    if (themeType === 'light' && themeId === 'light') return true;
    if (themeType === 'dark' && themeId === 'dark') return true;
    if (themeType === 'custom' && currentThemeName === themeId) return true;
    return false;
  };
  
  // Abrir el editor para un nuevo tema
  const createNewTheme = () => {
    setEditingTheme(undefined);
    setEditorVisible(true);
  };
  
  // Abrir el editor para editar un tema existente
  const editTheme = (themeName: string) => {
    const theme = customThemes.find(t => t.name === themeName);
    if (theme) {
      setEditingTheme({ name: theme.name, colors: isDarkMode ? theme.dark : theme.light });
      setEditorVisible(true);
    }
  };
  
  // Guardar un tema personalizado
  const saveTheme = (name: string, themeColors: ThemeColors) => {
    const newTheme = {
      name,
      light: { ...themeColors },
      dark: { 
        ...themeColors,
        background: '#0F172A',
        card: '#1E293B',
        cardBorder: '#334155',
        text: '#F1F5F9',
        textSecondary: '#CBD5E1',
        textMuted: '#94A3B8',
        inputBackground: '#1E293B',
        inputBorder: '#334155',
      }
    };
    
    addCustomTheme(newTheme);
    setCustomTheme(name);
  };
  
  // Eliminar un tema personalizado
  const confirmDeleteTheme = (themeName: string) => {
    Alert.alert(
      "Eliminar Tema",
      `¿Estás seguro de que quieres eliminar el tema "${themeName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: () => deleteCustomTheme(themeName)
        }
      ]
    );
  };

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView card style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>Modo de Tema</ThemedText>
        
        <View style={styles.toggleContainer}>
          <ThemedText>Modo Oscuro</ThemedText>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.switchTrack, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </ThemedView>
      
      <ThemedView card style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>Temas del Sistema</ThemedText>
        
        <View style={styles.themesContainer}>
          <ThemePreview
            label="Sistema"
            colors={isDarkMode ? darkTheme : lightTheme}
            selected={isThemeSelected('system')}
            onPress={() => setThemeType('system')}
          />
          
          <ThemePreview
            label="Claro"
            colors={lightTheme}
            selected={isThemeSelected('light')}
            onPress={() => setThemeType('light')}
          />
          
          <ThemePreview
            label="Oscuro"
            colors={darkTheme}
            selected={isThemeSelected('dark')}
            onPress={() => setThemeType('dark')}
          />
        </View>
      </ThemedView>
      
      {characterClass && classThemes[characterClass] && (
        <ThemedView card style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>Tema de tu Clase</ThemedText>
          
          <View style={styles.themesContainer}>
            <ThemePreview
              label={character.basicInfo.class || 'Clase'}
              colors={isDarkMode ? classThemes[characterClass].dark : classThemes[characterClass].light}
              selected={isThemeSelected(`class:${characterClass}`)}
              onPress={() => setClassTheme(characterClass)}
            />
          </View>
        </ThemedView>
      )}
      
      {characterRace && raceThemes[characterRace] && (
        <ThemedView card style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>Tema de tu Raza</ThemedText>
          
          <View style={styles.themesContainer}>
            <ThemePreview
              label={character.basicInfo.race || 'Raza'}
              colors={isDarkMode ? raceThemes[characterRace].dark : raceThemes[characterRace].light}
              selected={isThemeSelected(`race:${characterRace}`)}
              onPress={() => setRaceTheme(characterRace)}
            />
          </View>
        </ThemedView>
      )}
      
      <ThemedView card style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="title" style={styles.sectionTitle}>Temas Personalizados</ThemedText>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={createNewTheme}
          >
            <MaterialCommunityIcons name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        {customThemes.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText>No tienes temas personalizados.</ThemedText>
            <ThemedButton
              title="Crear Tema Personalizado"
              onPress={createNewTheme}
              style={styles.createButton}
            />
          </View>
        ) : (
          <View style={styles.customThemesContainer}>
            {customThemes.map(theme => (
              <View key={theme.name} style={styles.customThemeItem}>
                <ThemePreview
                  label={theme.name}
                  colors={isDarkMode ? theme.dark : theme.light}
                  selected={isThemeSelected(theme.name)}
                  onPress={() => setCustomTheme(theme.name)}
                />
                
                <View style={styles.themeActions}>
                  <TouchableOpacity
                    style={[styles.themeActionButton, { backgroundColor: colors.card }]}
                    onPress={() => editTheme(theme.name)}
                  >
                    <MaterialCommunityIcons name="pencil" size={18} color={colors.text} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.themeActionButton, { backgroundColor: colors.danger }]}
                    onPress={() => confirmDeleteTheme(theme.name)}
                  >
                    <MaterialCommunityIcons name="delete" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ThemedView>
      
      {/* Modal para crear/editar temas */}
      <CustomThemeEditor
        visible={editorVisible}
        onClose={() => setEditorVisible(false)}
        initialTheme={editingTheme}
        onSave={saveTheme}
      />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  themePreview: {
    width: 100,
    height: 140,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewHeader: {
    height: 30,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  previewLine: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  previewBody: {
    flex: 1,
    padding: 8,
  },
  previewCard: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  previewButton: {
    height: 20,
    borderRadius: 4,
  },
  previewText: {
    height: 8,
    width: '80%',
    borderRadius: 2,
  },
  previewLabel: {
    textAlign: 'center',
    padding: 8,
    fontSize: 12,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 16,
  },
  createButton: {
    marginTop: 12,
  },
  customThemesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  customThemeItem: {
    margin: 8,
  },
  themeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  themeActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  editorContainer: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editorScroll: {
    maxHeight: 450,
  },
  editorContent: {
    paddingBottom: 20,
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center', 
    marginVertical: 20,
  },
  editorLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  editorInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  colorButton: {
    width: '30%',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  colorButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  colorPickerContainer: {
    marginBottom: 20,
  },
  pickerTitle: {
    marginBottom: 12,
  },
  colorPicker: {
    height: 300,
    marginVertical: 10,
  },
  editorActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editorButton: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  saveButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});