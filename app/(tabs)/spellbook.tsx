// app/(tabs)/spellbook.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView, ThemedScrollView, ThemedText, ThemedTextInput, ThemedButton } from '../../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';
import { useCharacter } from '../context/CharacterContext';
import { 
  Spell, 
  SpellSchool, 
  SpellClass, 
  spells,
  getSpellsByLevel,
  getSpellsByClass,
  getSpellsBySchool,
  searchSpells
} from '../data/spellsData';

// Componente para mostrar un hechizo individual en el listado
const SpellListItem = ({ spell, onPress, isKnown }: { 
  spell: Spell, 
  onPress: () => void,
  isKnown: boolean
}) => {
  const { colors } = useTheme();

  // Función para renderizar los iconos de los componentes del hechizo
  const renderComponents = () => {
    return (
      <View style={styles.componentsContainer}>
        {spell.components.includes('V') && (
          <ThemedText style={styles.componentBadge}>V</ThemedText>
        )}
        {spell.components.includes('S') && (
          <ThemedText style={styles.componentBadge}>S</ThemedText>
        )}
        {spell.components.includes('M') && (
          <ThemedText style={styles.componentBadge}>M</ThemedText>
        )}
      </View>
    );
  };

  // Función para mostrar iconos de concentración y ritual si corresponde
  const renderTags = () => {
    return (
      <View style={styles.tagsContainer}>
        {spell.concentration && (
          <View style={[styles.tag, { backgroundColor: colors.primary + '40' }]}>
            <ThemedText style={styles.tagText}>C</ThemedText>
          </View>
        )}
        {spell.ritual && (
          <View style={[styles.tag, { backgroundColor: colors.primary + '40' }]}>
            <ThemedText style={styles.tagText}>R</ThemedText>
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.spellItem, 
        { 
          backgroundColor: colors.card,
          borderColor: isKnown ? colors.primary : colors.cardBorder
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.spellHeader}>
        <ThemedText type="title" style={styles.spellName}>{spell.name}</ThemedText>
        {isKnown && (
          <MaterialCommunityIcons 
            name="book-open-variant" 
            size={16} 
            color={colors.primary} 
          />
        )}
      </View>
      
      <View style={styles.spellMeta}>
        <ThemedText type="secondary">
          {spell.level === 0 ? 'Truco' : `Nivel ${spell.level}`} • {spell.school}
        </ThemedText>
        {renderComponents()}
        {renderTags()}
      </View>
      
      <View style={styles.spellClasses}>
        <ThemedText type="secondary" style={styles.classesText}>
          {spell.classes.join(', ')}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

// Componente modal para ver los detalles completos de un hechizo
const SpellDetailModal = ({ 
  spell, 
  visible, 
  onClose, 
  onAddToSpellbook,
  onRemoveFromSpellbook,
  isInSpellbook
}: { 
  spell: Spell | null, 
  visible: boolean, 
  onClose: () => void,
  onAddToSpellbook: () => void,
  onRemoveFromSpellbook: () => void,
  isInSpellbook: boolean
}) => {
  const { colors } = useTheme();

  if (!spell) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ScrollView style={styles.modalScroll}>
            <View style={styles.modalHeader}>
              <ThemedText type="title" style={styles.modalTitle}>{spell.name}</ThemedText>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ThemedText type="secondary" style={styles.spellType}>
              {spell.level === 0 
                ? `Truco de ${spell.school}` 
                : `${spell.school} de nivel ${spell.level}`}
            </ThemedText>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Tiempo de lanzamiento:</ThemedText>
              <ThemedText style={styles.detailValue}>{spell.castingTime}</ThemedText>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Alcance:</ThemedText>
              <ThemedText style={styles.detailValue}>{spell.range}</ThemedText>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Componentes:</ThemedText>
              <ThemedText style={styles.detailValue}>
                {spell.components.join(', ')}
                {spell.material && ` (${spell.material})`}
              </ThemedText>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Duración:</ThemedText>
              <ThemedText style={styles.detailValue}>
                {spell.concentration ? 'Concentración, ' : ''}{spell.duration}
              </ThemedText>
            </View>
            
            <View style={styles.detailSection}>
              <ThemedText style={styles.subheader}>Descripción:</ThemedText>
              <ThemedText style={styles.descriptionText}>{spell.description}</ThemedText>
            </View>
            
            {spell.higherLevels && (
              <View style={styles.detailSection}>
                <ThemedText style={styles.subheader}>A niveles superiores:</ThemedText>
                <ThemedText style={styles.descriptionText}>{spell.higherLevels}</ThemedText>
              </View>
            )}
            
            <View style={styles.detailSection}>
              <ThemedText style={styles.subheader}>Clases:</ThemedText>
              <ThemedText style={styles.descriptionText}>{spell.classes.join(', ')}</ThemedText>
            </View>
            
            <View style={styles.actionButtons}>
              {isInSpellbook ? (
                <ThemedButton
                  title="Eliminar del libro de hechizos"
                  onPress={onRemoveFromSpellbook}
                  variant="danger"
                  icon={<MaterialCommunityIcons name="book-minus" size={20} color="white" />}
                />
              ) : (
                <ThemedButton
                  title="Añadir al libro de hechizos"
                  onPress={onAddToSpellbook}
                  icon={<MaterialCommunityIcons name="book-plus" size={20} color="white" />}
                />
              )}
            </View>
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
};

// Componente principal de la pantalla de libro de hechizos
export default function SpellbookScreen() {
  const { colors } = useTheme();
  const { character, setCharacter } = useCharacter();
  const router = useRouter();
  
  // Estados para manejar los filtros y la búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSpells, setFilteredSpells] = useState<Spell[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<SpellSchool | null>(null);
  const [selectedClass, setSelectedClass] = useState<SpellClass | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Estados para el modal de detalles
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  
  // Estados para el modal de filtros
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Efecto para aplicar filtros y búsqueda
  useEffect(() => {
    setLoading(true);
    
    // Simular una pequeña demora para mostrar el indicador de carga
    setTimeout(() => {
      let results = [...spells];
      
      // Aplicar filtro por nivel
      if (selectedLevel !== null) {
        results = results.filter(spell => spell.level === selectedLevel);
      }
      
      // Aplicar filtro por escuela
      if (selectedSchool) {
        results = results.filter(spell => spell.school === selectedSchool);
      }
      
      // Aplicar filtro por clase
      if (selectedClass) {
        results = results.filter(spell => spell.classes.includes(selectedClass));
      }
      
      // Aplicar búsqueda
      if (searchQuery.trim()) {
        results = searchSpells(searchQuery).filter(spell => results.includes(spell));
      }
      
      setFilteredSpells(results);
      setLoading(false);
    }, 300);
  }, [searchQuery, selectedLevel, selectedSchool, selectedClass]);

  // Verificar si un hechizo está en el libro de hechizos del personaje
  const isSpellInSpellbook = (spell: Spell): boolean => {
    const characterSpells = character.spells?.[spell.level] || [];
    return characterSpells.some(
      (charSpell: any) => charSpell.name.toLowerCase() === spell.name.toLowerCase()
    );
  };

  // Añadir un hechizo al libro de hechizos del personaje
  const addSpellToSpellbook = () => {
    if (!selectedSpell) return;
    
    const level = selectedSpell.level;
    const newSpell = {
      name: selectedSpell.name,
      level,
      castingTime: selectedSpell.castingTime,
      range: selectedSpell.range,
      components: selectedSpell.components.join(', '),
      duration: selectedSpell.duration,
      description: selectedSpell.description + 
        (selectedSpell.higherLevels ? `\n\nA niveles superiores: ${selectedSpell.higherLevels}` : '') +
        `\n\nEscuela: ${selectedSpell.school}` +
        `\nClases: ${selectedSpell.classes.join(', ')}`,
      prepared: false,
    };
    
    // Mostrar confirmación antes de cerrar
    Alert.alert(
      "Hechizo añadido",
      `${selectedSpell.name} ha sido añadido a tu libro de hechizos.`,
      [
        { 
          text: "Ver en mi libro", 
          onPress: () => {
            setDetailModalVisible(false);
            // Añadir el hechizo y luego navegar
            setCharacter(prev => ({
              ...prev,
              spells: {
                ...prev.spells,
                [level]: [...(prev.spells?.[level] || []), newSpell]
              }
            }));
            router.push('/(tabs)/spells');
          }
        },
        { 
          text: "Continuar explorando", 
          onPress: () => {
            setCharacter(prev => ({
              ...prev,
              spells: {
                ...prev.spells,
                [level]: [...(prev.spells?.[level] || []), newSpell]
              }
            }));
            setDetailModalVisible(false);
          } 
        }
      ]
    );
  };

  // Eliminar un hechizo del libro de hechizos del personaje
  const removeSpellFromSpellbook = () => {
    if (!selectedSpell) return;
    
    const level = selectedSpell.level;
    
    setCharacter(prev => {
      const spellsAtLevel = [...(prev.spells?.[level] || [])];
      const updatedSpellsAtLevel = spellsAtLevel.filter(
        (spell: any) => spell.name.toLowerCase() !== selectedSpell.name.toLowerCase()
      );
      
      return {
        ...prev,
        spells: {
          ...prev.spells,
          [level]: updatedSpellsAtLevel
        }
      };
    });
    
    setDetailModalVisible(false);
  };

  // Mostrar el modal de detalles del hechizo
  const showSpellDetails = (spell: Spell) => {
    setSelectedSpell(spell);
    setDetailModalVisible(true);
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSelectedLevel(null);
    setSelectedSchool(null);
    setSelectedClass(null);
    setFilterModalVisible(false);
  };

  // Array de niveles de hechizos (0-9)
  const spellLevels = Array.from({ length: 10 }, (_, i) => i);
  
  // Obtener todas las escuelas de magia únicas
  const spellSchools: SpellSchool[] = Array.from(
    new Set(spells.map(spell => spell.school))
  ) as SpellSchool[];
  
  // Obtener todas las clases únicas
  const spellClasses: SpellClass[] = Array.from(
    new Set(spells.flatMap(spell => spell.classes))
  ) as SpellClass[];

  // Renderizar el componente de filtros
  const FilterModal = () => (
    <Modal
      visible={filterModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.filterModalContent}>
          <View style={styles.modalHeader}>
            <ThemedText type="title">Filtros</ThemedText>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filterScrollView}>
            {/* Filtro por nivel */}
            <View style={styles.filterSection}>
              <ThemedText type="subtitle" style={styles.filterTitle}>Nivel</ThemedText>
              <View style={styles.filterButtonsRow}>
                {spellLevels.map(level => (
                  <TouchableOpacity
                    key={`level-${level}`}
                    style={[
                      styles.filterChip,
                      { 
                        backgroundColor: selectedLevel === level ? colors.primary : colors.card,
                        borderColor: colors.cardBorder
                      }
                    ]}
                    onPress={() => setSelectedLevel(selectedLevel === level ? null : level)}
                  >
                    <ThemedText style={{ 
                      color: selectedLevel === level ? '#FFFFFF' : colors.text 
                    }}>
                      {level === 0 ? 'Truco' : level}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Filtro por escuela */}
            <View style={styles.filterSection}>
              <ThemedText type="subtitle" style={styles.filterTitle}>Escuela</ThemedText>
              <View style={styles.filterButtonsGrid}>
                {spellSchools.map(school => (
                  <TouchableOpacity
                    key={`school-${school}`}
                    style={[
                      styles.filterChip,
                      { 
                        backgroundColor: selectedSchool === school ? colors.primary : colors.card,
                        borderColor: colors.cardBorder
                      }
                    ]}
                    onPress={() => setSelectedSchool(selectedSchool === school ? null : school)}
                  >
                    <ThemedText style={{ 
                      color: selectedSchool === school ? '#FFFFFF' : colors.text 
                    }}>
                      {school}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Filtro por clase */}
            <View style={styles.filterSection}>
              <ThemedText type="subtitle" style={styles.filterTitle}>Clase</ThemedText>
              <View style={styles.filterButtonsGrid}>
                {spellClasses.map(spellClass => (
                  <TouchableOpacity
                    key={`class-${spellClass}`}
                    style={[
                      styles.filterChip,
                      { 
                        backgroundColor: selectedClass === spellClass ? colors.primary : colors.card,
                        borderColor: colors.cardBorder
                      }
                    ]}
                    onPress={() => setSelectedClass(selectedClass === spellClass ? null : spellClass)}
                  >
                    <ThemedText style={{ 
                      color: selectedClass === spellClass ? '#FFFFFF' : colors.text 
                    }}>
                      {spellClass}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.filterActions}>
            <ThemedButton
              title="Limpiar Filtros"
              onPress={clearFilters}
              variant="secondary"
              style={styles.filterButton}
            />
            <ThemedButton
              title="Aplicar"
              onPress={() => setFilterModalVisible(false)}
              style={styles.filterButton}
            />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );

  // Renderizar los indicadores de filtros activos
  const renderActiveFilters = () => {
    const hasFilters = selectedLevel !== null || selectedSchool !== null || selectedClass !== null;
    
    if (!hasFilters) return null;
    
    return (
      <View style={styles.activeFiltersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeFiltersScroll}>
          {selectedLevel !== null && (
            <View style={[styles.activeFilterChip, { backgroundColor: colors.primary + '20' }]}>
              <ThemedText style={styles.activeFilterText}>
                Nivel: {selectedLevel === 0 ? 'Truco' : selectedLevel}
              </ThemedText>
              <TouchableOpacity onPress={() => setSelectedLevel(null)}>
                <MaterialCommunityIcons name="close-circle" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
          
          {selectedSchool && (
            <View style={[styles.activeFilterChip, { backgroundColor: colors.primary + '20' }]}>
              <ThemedText style={styles.activeFilterText}>
                Escuela: {selectedSchool}
              </ThemedText>
              <TouchableOpacity onPress={() => setSelectedSchool(null)}>
                <MaterialCommunityIcons name="close-circle" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
          
          {selectedClass && (
            <View style={[styles.activeFilterChip, { backgroundColor: colors.primary + '20' }]}>
              <ThemedText style={styles.activeFilterText}>
                Clase: {selectedClass}
              </ThemedText>
              <TouchableOpacity onPress={() => setSelectedClass(null)}>
                <MaterialCommunityIcons name="close-circle" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.clearAllButton, { borderColor: colors.primary }]}
            onPress={clearFilters}
          >
            <ThemedText style={{ color: colors.primary }}>Limpiar Todo</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <ThemedTextInput
            placeholder="Buscar hechizos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            containerStyle={styles.searchInputWrapper}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearch}>
              <MaterialCommunityIcons name="close-circle" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          onPress={() => setFilterModalVisible(true)}
        >
          <MaterialCommunityIcons name="filter-variant" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      {/* Indicadores de filtros activos */}
      {renderActiveFilters()}
      
      {/* Lista de hechizos */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText style={styles.loadingText}>Cargando hechizos...</ThemedText>
        </View>
      ) : (
        <FlatList
          data={filteredSpells}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SpellListItem 
              spell={item} 
              onPress={() => showSpellDetails(item)}
              isKnown={isSpellInSpellbook(item)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="book-search" size={64} color={colors.textMuted} />
              <ThemedText style={styles.emptyText}>
                No se encontraron hechizos con los criterios seleccionados
              </ThemedText>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      {/* Modal de detalles del hechizo */}
      <SpellDetailModal
        spell={selectedSpell}
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        onAddToSpellbook={addSpellToSpellbook}
        onRemoveFromSpellbook={removeSpellFromSpellbook}
        isInSpellbook={selectedSpell ? isSpellInSpellbook(selectedSpell) : false}
      />
      
      {/* Modal de filtros */}
      <FilterModal />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  searchInputWrapper: {
    flex: 1,
    marginBottom: 0,
  },
  searchInput: {
    paddingLeft: 36,
    paddingRight: 36,
    height: 40,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  clearSearch: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  activeFiltersScroll: {
    flexDirection: 'row',
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterText: {
    marginRight: 6,
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  spellItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  spellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  spellName: {
    fontSize: 16,
    marginRight: 8,
  },
  spellMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  componentsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  componentBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  spellClasses: {
    marginTop: 4,
  },
  classesText: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '92%',
    maxHeight: '85%',
    borderRadius: 12,
    padding: 20,
  },
  modalScroll: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  spellType: {
    marginBottom: 16,
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: '40%',
  },
  detailValue: {
    flex: 1,
  },
  detailSection: {
    marginTop: 16,
  },
  subheader: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    lineHeight: 20,
    marginBottom: 8,
    textAlign: 'justify',
  },
  actionButtons: {
    marginTop: 24,
    marginBottom: 16,
  },
  filterModalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 16,
  },
  filterScrollView: {
    flex: 1,
    marginVertical: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    marginBottom: 8,
  },
  filterButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
    borderWidth: 1,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    maxWidth: '80%',
  }
});