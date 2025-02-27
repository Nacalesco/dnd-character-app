// app/context/ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definimos los tipos de temas
export type ThemeType = 'system' | 'light' | 'dark' | 'custom';
export type CharacterClassTheme = 'fighter' | 'wizard' | 'rogue' | 'cleric' | 'bard' | 'barbarian' | 'druid' | 'monk' | 'paladin' | 'ranger' | 'sorcerer' | 'warlock';
export type CharacterRaceTheme = 'human' | 'elf' | 'dwarf' | 'halfling' | 'gnome' | 'half-orc' | 'half-elf' | 'tiefling' | 'dragonborn';

// Tipo para los colores del tema
export type ThemeColors = {
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  success: string;
  danger: string;
  inputBackground: string;
  inputBorder: string;
  switchTrack: string;
};

// Definimos los colores para cada tema
export const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  card: '#F8FAFC',
  cardBorder: '#E2E8F0',
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  primary: '#6366F1',
  success: '#10B981',
  danger: '#EF4444',
  inputBackground: '#FFFFFF',
  inputBorder: '#E2E8F0',
  switchTrack: '#E2E8F0',
};

export const darkTheme: ThemeColors = {
  background: '#0F172A',
  card: '#1E293B',
  cardBorder: '#334155',
  text: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  primary: '#818CF8',
  success: '#34D399',
  danger: '#F87171',
  inputBackground: '#1E293B',
  inputBorder: '#334155',
  switchTrack: '#334155',
};

// Temas de clases
export const classThemes: Record<CharacterClassTheme, { light: ThemeColors, dark: ThemeColors }> = {
  fighter: {
    light: { ...lightTheme, primary: '#B91C1C', success: '#15803D' }, // Rojo/verde
    dark: { ...darkTheme, primary: '#EF4444', success: '#22C55E' }
  },
  wizard: {
    light: { ...lightTheme, primary: '#6D28D9', success: '#4F46E5' }, // Púrpura/índigo
    dark: { ...darkTheme, primary: '#A78BFA', success: '#818CF8' }
  },
  rogue: {
    light: { ...lightTheme, primary: '#171717', success: '#374151' }, // Negro/gris oscuro
    dark: { ...darkTheme, primary: '#525252', success: '#9CA3AF' }
  },
  cleric: {
    light: { ...lightTheme, primary: '#FBBF24', success: '#FFFFFF' }, // Dorado/blanco
    dark: { ...darkTheme, primary: '#F59E0B', success: '#F8FAFC' }
  },
  bard: {
    light: { ...lightTheme, primary: '#7C3AED', success: '#EC4899' }, // Violeta/rosa
    dark: { ...darkTheme, primary: '#A78BFA', success: '#F472B6' }
  },
  barbarian: {
    light: { ...lightTheme, primary: '#7F1D1D', success: '#991B1B' }, // Rojo oscuro/rojo sangre
    dark: { ...darkTheme, primary: '#B91C1C', success: '#DC2626' }
  },
  druid: {
    light: { ...lightTheme, primary: '#15803D', success: '#65A30D' }, // Verde/oliva
    dark: { ...darkTheme, primary: '#22C55E', success: '#84CC16' }
  },
  monk: {
    light: { ...lightTheme, primary: '#0369A1', success: '#0284C7' }, // Azul/celeste
    dark: { ...darkTheme, primary: '#0EA5E9', success: '#38BDF8' }
  },
  paladin: {
    light: { ...lightTheme, primary: '#C2410C', success: '#D97706' }, // Naranja oscuro/ámbar
    dark: { ...darkTheme, primary: '#F97316', success: '#F59E0B' }
  },
  ranger: {
    light: { ...lightTheme, primary: '#166534', success: '#4D7C0F' }, // Verde bosque/verde oliva
    dark: { ...darkTheme, primary: '#16A34A', success: '#84CC16' }
  },
  sorcerer: {
    light: { ...lightTheme, primary: '#C026D3', success: '#A21CAF' }, // Magenta/púrpura
    dark: { ...darkTheme, primary: '#E879F9', success: '#D946EF' }
  },
  warlock: {
    light: { ...lightTheme, primary: '#4C1D95', success: '#6D28D9' }, // Púrpura oscuro/violeta
    dark: { ...darkTheme, primary: '#8B5CF6', success: '#A78BFA' }
  }
};

// Temas de razas
export const raceThemes: Record<CharacterRaceTheme, { light: ThemeColors, dark: ThemeColors }> = {
  human: {
    light: { ...lightTheme, primary: '#6366F1', success: '#10B981' }, // Tema predeterminado
    dark: { ...darkTheme, primary: '#818CF8', success: '#34D399' }
  },
  elf: {
    light: { ...lightTheme, primary: '#047857', success: '#065F46' }, // Verde esmeralda
    dark: { ...darkTheme, primary: '#10B981', success: '#059669' }
  },
  dwarf: {
    light: { ...lightTheme, primary: '#92400E', success: '#B45309' }, // Marrón/ámbar
    dark: { ...darkTheme, primary: '#D97706', success: '#F59E0B' }
  },
  halfling: {
    light: { ...lightTheme, primary: '#65A30D', success: '#4D7C0F' }, // Verde claro/oliva
    dark: { ...darkTheme, primary: '#84CC16', success: '#65A30D' }
  },
  gnome: {
    light: { ...lightTheme, primary: '#0EA5E9', success: '#0284C7' }, // Azul cielo/azul
    dark: { ...darkTheme, primary: '#38BDF8', success: '#0EA5E9' }
  },
  'half-orc': {
    light: { ...lightTheme, primary: '#65A30D', success: '#4D7C0F' }, // Verde amarillento
    dark: { ...darkTheme, primary: '#84CC16', success: '#65A30D' }
  },
  'half-elf': {
    light: { ...lightTheme, primary: '#8B5CF6', success: '#7C3AED' }, // Violeta/púrpura
    dark: { ...darkTheme, primary: '#A78BFA', success: '#8B5CF6' }
  },
  tiefling: {
    light: { ...lightTheme, primary: '#DC2626', success: '#B91C1C' }, // Rojo brillante/rojo oscuro
    dark: { ...darkTheme, primary: '#EF4444', success: '#DC2626' }
  },
  dragonborn: {
    light: { ...lightTheme, primary: '#B45309', success: '#92400E' }, // Ámbar/marrón
    dark: { ...darkTheme, primary: '#F59E0B', success: '#D97706' }
  }
};

// Tipo para el tema personalizado
interface CustomTheme {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

// Tipo para el contexto de tema
type ThemeContextType = {
  isDarkMode: boolean;
  themeType: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
  setClassTheme: (className: CharacterClassTheme) => void;
  setRaceTheme: (raceName: CharacterRaceTheme) => void;
  customThemes: CustomTheme[];
  addCustomTheme: (theme: CustomTheme) => void;
  deleteCustomTheme: (themeName: string) => void;
  setCustomTheme: (themeName: string) => void;
  currentThemeName: string | null;
};

// Creamos el contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Tema personalizado por defecto
const DEFAULT_CUSTOM_THEMES: CustomTheme[] = [];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Obtener el esquema de color del sistema
  const systemColorScheme = useColorScheme();
  
  // Estados para manejar el tema
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [themeType, setThemeType] = useState<ThemeType>('system');
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>(DEFAULT_CUSTOM_THEMES);
  const [currentThemeName, setCurrentThemeName] = useState<string | null>(null);
  const [themeColors, setThemeColors] = useState<ThemeColors>(
    systemColorScheme === 'dark' ? darkTheme : lightTheme
  );

  // Cargamos las preferencias guardadas al iniciar
  useEffect(() => {
    loadThemePreferences();
  }, []);

  // Efecto para actualizar el modo oscuro cuando cambia el esquema del sistema
  useEffect(() => {
    if (themeType === 'system') {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, themeType]);

  // Actualizar colores cuando cambia el modo o tipo de tema
  useEffect(() => {
    updateThemeColors();
  }, [isDarkMode, themeType, currentThemeName]);

  // Función para cargar las preferencias de tema
  const loadThemePreferences = async () => {
    try {
      // Cargar el tipo de tema
      const storedThemeType = await AsyncStorage.getItem('themeType');
      if (storedThemeType !== null) {
        setThemeType(storedThemeType as ThemeType);
      }

      // Cargar modo oscuro si no es 'system'
      if (storedThemeType && storedThemeType !== 'system') {
        const storedDarkMode = await AsyncStorage.getItem('isDarkMode');
        if (storedDarkMode !== null) {
          setIsDarkMode(storedDarkMode === 'true');
        }
      }

      // Cargar temas personalizados
      const storedCustomThemes = await AsyncStorage.getItem('customThemes');
      if (storedCustomThemes !== null) {
        setCustomThemes(JSON.parse(storedCustomThemes));
      }

      // Cargar el tema actual
      const storedThemeName = await AsyncStorage.getItem('currentThemeName');
      if (storedThemeName !== null) {
        setCurrentThemeName(storedThemeName);
      }
    } catch (error) {
      console.error('Error loading theme preferences:', error);
    }
  };

  // Función para guardar las preferencias de tema
  const saveThemePreferences = async () => {
    try {
      await AsyncStorage.setItem('themeType', themeType);
      await AsyncStorage.setItem('isDarkMode', isDarkMode.toString());
      await AsyncStorage.setItem('customThemes', JSON.stringify(customThemes));
      if (currentThemeName) {
        await AsyncStorage.setItem('currentThemeName', currentThemeName);
      } else {
        await AsyncStorage.removeItem('currentThemeName');
      }
    } catch (error) {
      console.error('Error saving theme preferences:', error);
    }
  };

  // Función para actualizar los colores del tema
  const updateThemeColors = () => {
    let newColors: ThemeColors;

    if (themeType === 'light') {
      newColors = lightTheme;
    } else if (themeType === 'dark') {
      newColors = darkTheme;
    } else if (themeType === 'custom' && currentThemeName) {
      // Buscar el tema personalizado por nombre
      const customTheme = customThemes.find(theme => theme.name === currentThemeName);
      if (customTheme) {
        newColors = isDarkMode ? customTheme.dark : customTheme.light;
      } else {
        // Si no se encuentra, usar el tema predeterminado
        newColors = isDarkMode ? darkTheme : lightTheme;
      }
    } else {
      // Tema del sistema
      newColors = isDarkMode ? darkTheme : lightTheme;
    }

    setThemeColors(newColors);
  };

  // Función para cambiar entre temas claro y oscuro
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Si el tema es del sistema, cambiarlo a modo manual
    if (themeType === 'system') {
      const newThemeType: ThemeType = newDarkMode ? 'dark' : 'light';
      setThemeType(newThemeType);
    }

    // Guardar las preferencias
    setTimeout(() => saveThemePreferences(), 100);
  };

  // Función para establecer el tipo de tema
  const setThemeTypeHandler = (type: ThemeType) => {
    setThemeType(type);
    
    // Si se cambia a sistema, actualizar el modo oscuro según el sistema
    if (type === 'system') {
      setIsDarkMode(systemColorScheme === 'dark');
    }
    
    // Si se cambia a un tipo que no es personalizado, limpiar el tema actual
    if (type !== 'custom') {
      setCurrentThemeName(null);
    }
    
    // Guardar las preferencias
    setTimeout(() => saveThemePreferences(), 100);
  };

  // Función para establecer un tema de clase
  const setClassTheme = (className: CharacterClassTheme) => {
    setThemeType('custom');
    setCurrentThemeName(`class:${className}`);
    
    const classTheme = classThemes[className];
    setThemeColors(isDarkMode ? classTheme.dark : classTheme.light);
    
    // Guardar las preferencias
    setTimeout(() => saveThemePreferences(), 100);
  };

  // Función para establecer un tema de raza
  const setRaceTheme = (raceName: CharacterRaceTheme) => {
    setThemeType('custom');
    setCurrentThemeName(`race:${raceName}`);
    
    const raceTheme = raceThemes[raceName];
    setThemeColors(isDarkMode ? raceTheme.dark : raceTheme.light);
    
    // Guardar las preferencias
    setTimeout(() => saveThemePreferences(), 100);
  };

  // Función para añadir un tema personalizado
  const addCustomTheme = (theme: CustomTheme) => {
    // Comprobar si ya existe un tema con ese nombre
    const themeExists = customThemes.some(t => t.name === theme.name);
    
    if (themeExists) {
      // Actualizar el tema existente
      setCustomThemes(prev => 
        prev.map(t => t.name === theme.name ? theme : t)
      );
    } else {
      // Añadir el nuevo tema
      setCustomThemes(prev => [...prev, theme]);
    }
    
    // Guardar las preferencias
    setTimeout(() => saveThemePreferences(), 100);
  };

  // Función para eliminar un tema personalizado
  const deleteCustomTheme = (themeName: string) => {
    setCustomThemes(prev => prev.filter(theme => theme.name !== themeName));
    
    // Si es el tema actual, cambiar al tema predeterminado
    if (currentThemeName === themeName) {
      setThemeType('system');
      setCurrentThemeName(null);
    }
    
    // Guardar las preferencias
    setTimeout(() => saveThemePreferences(), 100);
  };

  // Función para establecer un tema personalizado
  const setCustomTheme = (themeName: string) => {
    // Verificar si es un tema de clase o raza
    if (themeName.startsWith('class:')) {
      const className = themeName.split(':')[1] as CharacterClassTheme;
      setClassTheme(className);
      return;
    }
    
    if (themeName.startsWith('race:')) {
      const raceName = themeName.split(':')[1] as CharacterRaceTheme;
      setRaceTheme(raceName);
      return;
    }
    
    // Verificar si existe el tema personalizado
    const theme = customThemes.find(t => t.name === themeName);
    if (theme) {
      setThemeType('custom');
      setCurrentThemeName(themeName);
      setThemeColors(isDarkMode ? theme.dark : theme.light);
      
      // Guardar las preferencias
      setTimeout(() => saveThemePreferences(), 100);
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        themeType,
        colors: themeColors, 
        toggleTheme,
        setThemeType: setThemeTypeHandler,
        setClassTheme,
        setRaceTheme,
        customThemes,
        addCustomTheme,
        deleteCustomTheme,
        setCustomTheme,
        currentThemeName
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar el tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}