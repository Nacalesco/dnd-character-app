// app/(tabs)/dice.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Vibration, Text as RNText } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView, ThemedScrollView, ThemedText } from '../../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';
import { Svg, Polygon, Circle, Text, Rect, G, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

// Definir tipos de dados
type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

// Definir colores para cada tipo de dado
const diceColors = {
  'd4': { light: '#ff6b6b', dark: '#c92a2a', gradient: ['#FF8A8A', '#c92a2a'] },
  'd6': { light: '#4dabf7', dark: '#1864ab', gradient: ['#74C0FF', '#1864ab'] },
  'd8': { light: '#51cf66', dark: '#2b8a3e', gradient: ['#80E699', '#2b8a3e'] },
  'd10': { light: '#cc5de8', dark: '#862e9c', gradient: ['#E086FF', '#862e9c'] },
  'd12': { light: '#fcc419', dark: '#e67700', gradient: ['#FFD966', '#e67700'] },
  'd20': { light: '#ff922b', dark: '#d9480f', gradient: ['#FFB366', '#d9480f'] },
  'd100': { light: '#868e96', dark: '#495057', gradient: ['#ADB5BD', '#495057'] },
};

// Historia de tiradas
type DiceRoll = {
  id: number;
  diceType: DiceType;
  result: number;
  timestamp: Date;
};

export default function DiceScreen() {
  const { colors, isDarkMode } = useTheme();
  const [selectedDice, setSelectedDice] = useState<DiceType[]>([]);
  const [rolling, setRolling] = useState<boolean>(false);
  const [currentResults, setCurrentResults] = useState<{[key in DiceType]?: number}>({});
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Función para lanzar dados
  const rollDice = () => {
    if (selectedDice.length === 0) return;
    
    // Reiniciar animación
    spinValue.setValue(0);
    
    // Iniciar animación de giro
    setRolling(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Animación de giro
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 10,
        duration: 1500,
        useNativeDriver: true
      })
    ]).start(() => {
      // Cuando termina la animación
      setRolling(false);
      Vibration.vibrate(200);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Calcular resultados
      const results: {[key in DiceType]?: number} = {};
      const newRolls: DiceRoll[] = [];
      
      selectedDice.forEach(diceType => {
        const sides = getSidesFromDiceType(diceType);
        const result = Math.floor(Math.random() * sides) + 1;
        results[diceType] = result;
        
        // Añadir a historial
        newRolls.push({
          id: Date.now() + Math.random(),
          diceType,
          result,
          timestamp: new Date()
        });
      });
      
      setCurrentResults(results);
      setRollHistory([...newRolls, ...rollHistory].slice(0, 20));
    });
  };

  // Función para obtener número de caras según tipo de dado
  const getSidesFromDiceType = (diceType: DiceType): number => {
    switch (diceType) {
      case 'd4': return 4;
      case 'd6': return 6;
      case 'd8': return 8;
      case 'd10': return 10;
      case 'd12': return 12;
      case 'd20': return 20;
      case 'd100': return 100;
      default: return 6;
    }
  };

  // Función para alternar selección de dado
  const toggleDice = (diceType: DiceType) => {
    if (rolling) return;
    
    setSelectedDice(prev => {
      if (prev.includes(diceType)) {
        return prev.filter(d => d !== diceType);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        return [...prev, diceType];
      }
    });
  };

  // Rotación para animación de dados
  const spin = spinValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    outputRange: ['0deg', '180deg', '360deg', '540deg', '720deg', '900deg', '1080deg', '1260deg', '1440deg', '1530deg', '1620deg']
  });

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.diceSelectionArea}>
        <ThemedText type="title" style={styles.sectionTitle}>Selecciona los dados</ThemedText>
        
        <View style={styles.diceGrid}>
          {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'] as DiceType[]).map((diceType) => (
            <TouchableOpacity
              key={diceType}
              style={[
                styles.diceButton,
                selectedDice.includes(diceType) && {
                  backgroundColor: isDarkMode ? diceColors[diceType].dark : diceColors[diceType].light,
                  borderColor: isDarkMode ? diceColors[diceType].light : diceColors[diceType].dark,
                  borderWidth: 2,
                }
              ]}
              onPress={() => toggleDice(diceType)}
              disabled={rolling}
            >
              <RenderDice
                diceType={diceType}
                selected={selectedDice.includes(diceType)}
                isDarkMode={isDarkMode}
              />
              <ThemedText 
                style={[
                  styles.diceTypeText, 
                  selectedDice.includes(diceType) && { color: '#FFFFFF' }
                ]}
              >
                {diceType}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>
      
      <View style={styles.rollButtonContainer}>
        <TouchableOpacity
          style={[
            styles.rollButton,
            { backgroundColor: colors.primary },
            (selectedDice.length === 0 || rolling) && { opacity: 0.6 }
          ]}
          onPress={rollDice}
          disabled={selectedDice.length === 0 || rolling}
        >
          <MaterialCommunityIcons name="dice-multiple" size={24} color="#FFFFFF" />
          <RNText style={styles.rollButtonText}>
            {rolling ? 'Lanzando...' : 'Lanzar Dados'}
          </RNText>
        </TouchableOpacity>
      </View>
      
      {Object.keys(currentResults).length > 0 && (
        <ThemedView card style={styles.resultsContainer}>
          <ThemedText type="title" style={styles.resultsTitle}>Resultados</ThemedText>
          
          <View style={styles.currentRollResults}>
            {selectedDice.map((diceType) => (
              <Animated.View
                key={diceType}
                style={[
                  styles.resultDiceContainer,
                  { transform: rolling ? [{ rotate: spin }] : [] }
                ]}
              >
                <View style={[
                  styles.resultDice,
                  { 
                    backgroundColor: isDarkMode ? diceColors[diceType].dark : diceColors[diceType].light,
                    borderColor: isDarkMode ? diceColors[diceType].light : diceColors[diceType].dark,
                  }
                ]}>
                  <RenderDice
                    diceType={diceType}
                    selected={true}
                    isDarkMode={isDarkMode}
                    result={currentResults[diceType]}
                    showResult={!rolling}
                  />
                </View>
                <ThemedText style={styles.resultDiceType}>{diceType}</ThemedText>
                {!rolling && (
                  <ThemedText style={styles.resultValue}>
                    {currentResults[diceType]}
                  </ThemedText>
                )}
              </Animated.View>
            ))}
          </View>
        </ThemedView>
      )}
      
      {rollHistory.length > 0 && (
        <ThemedView style={styles.historyContainer}>
          <ThemedText type="title" style={styles.sectionTitle}>Historial</ThemedText>
          
          <View style={styles.historyList}>
            {rollHistory.map((roll) => (
              <ThemedView card key={roll.id} style={styles.historyItem}>
                <View style={styles.historyItemRow}>
                  <View style={[
                    styles.historyDiceIndicator,
                    { backgroundColor: isDarkMode ? diceColors[roll.diceType].dark : diceColors[roll.diceType].light }
                  ]}>
                    <ThemedText style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {roll.diceType}
                    </ThemedText>
                  </View>
                  <ThemedText type="title" style={styles.historyResult}>
                    {roll.result}
                  </ThemedText>
                  <ThemedText type="secondary" style={styles.historyTimestamp}>
                    {roll.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </ThemedText>
                </View>
              </ThemedView>
            ))}
          </View>
        </ThemedView>
      )}
    </ThemedScrollView>
  );
}

// Componente para renderizar cada tipo de dado
interface RenderDiceProps {
  diceType: DiceType;
  selected: boolean;
  isDarkMode: boolean;
  result?: number;
  showResult?: boolean;
}

function RenderDice({ diceType, selected, isDarkMode, result, showResult = false }: RenderDiceProps) {
  const diceColor = isDarkMode ? diceColors[diceType].dark : diceColors[diceType].light;
  const diceColorDark = isDarkMode ? diceColors[diceType].light : diceColors[diceType].dark;
  
  switch (diceType) {
    case 'd4':
      return (
        <Svg width="60" height="60" viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="d4Gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={diceColors[diceType].gradient[0]} />
              <Stop offset="1" stopColor={diceColors[diceType].gradient[1]} />
            </LinearGradient>
          </Defs>
          <Polygon 
            points="30,5 55,50 5,50" 
            fill={selected ? "url(#d4Gradient)" : "#E2E8F0"} 
            stroke={diceColorDark} 
            strokeWidth="1.5"
          />
          {showResult && result && (
            <Text
              x="30"
              y="40"
              textAnchor="middle"
              fill="#FFFFFF"
              fontWeight="bold"
              fontSize="18"
            >
              {result}
            </Text>
          )}
        </Svg>
      );
      
    case 'd6':
      return (
        <Svg width="60" height="60" viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="d6Gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={diceColors[diceType].gradient[0]} />
              <Stop offset="1" stopColor={diceColors[diceType].gradient[1]} />
            </LinearGradient>
          </Defs>
          <Rect 
            x="10" 
            y="10" 
            width="40" 
            height="40" 
            rx="5" 
            fill={selected ? "url(#d6Gradient)" : "#E2E8F0"} 
            stroke={diceColorDark} 
            strokeWidth="1.5"
          />
          {!showResult && (
            <>
              <Circle cx="20" cy="20" r="3" fill="#FFFFFF" />
              <Circle cx="40" cy="20" r="3" fill="#FFFFFF" />
              <Circle cx="20" cy="40" r="3" fill="#FFFFFF" />
              <Circle cx="40" cy="40" r="3" fill="#FFFFFF" />
              <Circle cx="30" cy="30" r="3" fill="#FFFFFF" />
              <Circle cx="30" cy="20" r="3" fill="#FFFFFF" />
            </>
          )}
          {showResult && result && (
            <Text
              x="30"
              y="35"
              textAnchor="middle"
              fill="#FFFFFF"
              fontWeight="bold"
              fontSize="22"
            >
              {result}
            </Text>
          )}
        </Svg>
      );
      
    case 'd8':
      return (
        <Svg width="60" height="60" viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="d8Gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={diceColors[diceType].gradient[0]} />
              <Stop offset="1" stopColor={diceColors[diceType].gradient[1]} />
            </LinearGradient>
          </Defs>
          <Polygon 
            points="30,5 55,30 30,55 5,30" 
            fill={selected ? "url(#d8Gradient)" : "#E2E8F0"} 
            stroke={diceColorDark} 
            strokeWidth="1.5"
          />
          {showResult && result && (
            <Text
              x="30"
              y="35"
              textAnchor="middle"
              fill="#FFFFFF"
              fontWeight="bold"
              fontSize="20"
            >
              {result}
            </Text>
          )}
        </Svg>
      );
      
    case 'd10':
      return (
        <Svg width="60" height="60" viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="d10Gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={diceColors[diceType].gradient[0]} />
              <Stop offset="1" stopColor={diceColors[diceType].gradient[1]} />
            </LinearGradient>
          </Defs>
          <Polygon 
            points="30,5 40,15 50,30 40,45 30,55 20,45 10,30 20,15" 
            fill={selected ? "url(#d10Gradient)" : "#E2E8F0"} 
            stroke={diceColorDark} 
            strokeWidth="1.5"
          />
          {showResult && result && (
            <Text
              x="30"
              y="35"
              textAnchor="middle"
              fill="#FFFFFF"
              fontWeight="bold"
              fontSize="18"
            >
              {result}
            </Text>
          )}
        </Svg>
      );
      
    case 'd12':
      return (
        <Svg width="60" height="60" viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="d12Gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={diceColors[diceType].gradient[0]} />
              <Stop offset="1" stopColor={diceColors[diceType].gradient[1]} />
            </LinearGradient>
          </Defs>
          <Polygon 
            points="30,5 42,10 50,20 50,40 42,50 30,55 18,50 10,40 10,20 18,10" 
            fill={selected ? "url(#d12Gradient)" : "#E2E8F0"} 
            stroke={diceColorDark} 
            strokeWidth="1.5"
          />
          {showResult && result && (
            <Text
              x="30"
              y="35"
              textAnchor="middle"
              fill="#FFFFFF"
              fontWeight="bold"
              fontSize={result > 9 ? "16" : "20"}
            >
              {result}
            </Text>
          )}
        </Svg>
      );
      
    case 'd20':
      return (
        <Svg width="60" height="60" viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="d20Gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={diceColors[diceType].gradient[0]} />
              <Stop offset="1" stopColor={diceColors[diceType].gradient[1]} />
            </LinearGradient>
          </Defs>
          <Path 
            d="M30,5 L40,15 L50,25 L50,35 L40,45 L30,55 L20,45 L10,35 L10,25 L20,15 L30,5" 
            fill={selected ? "url(#d20Gradient)" : "#E2E8F0"} 
            stroke={diceColorDark} 
            strokeWidth="1.5"
          />
          {showResult && result && (
            <Text
              x="30"
              y="35"
              textAnchor="middle"
              fill="#FFFFFF"
              fontWeight="bold"
              fontSize={result > 9 ? "16" : "20"}
            >
              {result}
            </Text>
          )}
        </Svg>
      );

    case 'd100':
      return (
        <Svg width="60" height="60" viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="d100Gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={diceColors[diceType].gradient[0]} />
              <Stop offset="1" stopColor={diceColors[diceType].gradient[1]} />
            </LinearGradient>
          </Defs>
          <Circle 
            cx="30" 
            cy="30" 
            r="25" 
            fill={selected ? "url(#d100Gradient)" : "#E2E8F0"} 
            stroke={diceColorDark} 
            strokeWidth="1.5"
          />
          <Path 
            d="M20,15 L40,15 L40,45 L20,45 Z" 
            fill={selected ? diceColors[diceType].dark : "#D1D5DB"} 
            stroke={diceColorDark} 
            strokeWidth="1"
          />
          {showResult && result && (
            <G>
              <Text
                x="30"
                y="35"
                textAnchor="middle"
                fill="#FFFFFF"
                fontWeight="bold"
                fontSize={result > 9 ? "14" : "16"}
              >
                {result}
              </Text>
              <Text
                x="44"
                y="20"
                textAnchor="middle"
                fill="#FFFFFF"
                fontWeight="bold"
                fontSize="10"
              >
                %
              </Text>
            </G>
          )}
        </Svg>
      );
      
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  diceSelectionArea: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  diceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  diceButton: {
    width: 80,
    height: 100,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  diceTypeText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rollButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  rollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rollButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultsContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
  },
  resultsTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  currentRollResults: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  resultDiceContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: 80,
  },
  resultDice: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 8,
  },
  resultDiceType: {
    fontSize: 12,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  historyContainer: {
    padding: 16,
  },
  historyList: {
    marginBottom: 24,
  },
  historyItem: {
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
  },
  historyItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDiceIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  historyResult: {
    flex: 1,
    fontSize: 18,
  },
  historyTimestamp: {
    fontSize: 12,
  },
});