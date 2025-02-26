// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Si quieres añadir iconos

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#6366f1', // Color para la pestaña activa
      tabBarInactiveTintColor: '#94a3b8', // Color para pestañas inactivas
    }}>
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
    </Tabs>
  );
}