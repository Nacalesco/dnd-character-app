// app/context/ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definimos los colores para cada tema
export const lightTheme = {
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

export const darkTheme = {
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

// Tipo para nuestro contexto
type ThemeContextType = {
  isDarkMode: boolean;
  colors: typeof lightTheme;
  toggleTheme: () => void;
};

// Creamos el contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Obtener el esquema de color del sistema
  const systemColorScheme = useColorScheme();
  
  // Estado para controlar el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Cargamos la preferencia guardada al iniciar
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Función para cargar la preferencia de tema
  const loadThemePreference = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('themePreference');
      if (storedTheme !== null) {
        setIsDarkMode(storedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  // Función para guardar la preferencia de tema
  const saveThemePreference = async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem('themePreference', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Función para cambiar entre temas
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      saveThemePreference(newValue);
      return newValue;
    });
  };

  // Determinamos los colores según el tema actual
  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
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