// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function TabLayout() {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  // Botón para alternar entre tema claro y oscuro
  const ThemeToggleButton = () => (
    <TouchableOpacity 
      onPress={toggleTheme}
      style={{ marginRight: 15 }}
    >
      <MaterialCommunityIcons 
        name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'} 
        size={24} 
        color={colors.text} 
      />
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.cardBorder,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerRight: () => <ThemeToggleButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Básico',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="attributes"
        options={{
          title: 'Atributos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="sword" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="combat"
        options={{
          title: 'Combate',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shield" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Habilidades',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventario',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bag-personal" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="spells"
        options={{
          title: 'Hechizos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="auto-fix" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="spellbook"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dice"
        options={{
          title: 'Dados',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dice-multiple" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}