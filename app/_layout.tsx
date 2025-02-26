// app/_layout.tsx
import { Stack } from 'expo-router';
import { CharacterProvider } from './context/CharacterContext';

export default function RootLayout() {
  return (
    <CharacterProvider>
      <Stack>
        <Stack.Screen name="D&D chota" options={{ headerShown: false }} />
      </Stack>
    </CharacterProvider>
  );
}