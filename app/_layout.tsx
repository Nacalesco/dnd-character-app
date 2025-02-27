// app/_layout.tsx
import { Stack } from 'expo-router';
import { CharacterProvider } from './context/CharacterContext';
import { ThemeProvider } from './context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './context/ThemeContext';

// Componente para el StatusBar con tema
function ThemedStatusBar() {
  const { isDarkMode } = useTheme();
  return <StatusBar style={isDarkMode ? 'light' : 'dark'} />;
}

// Wrapper para el Stack con temas
function ThemedStack({ children }: { children: React.ReactNode }) {
  const { colors, isDarkMode } = useTheme();
  
  return (
    <>
      <ThemedStatusBar />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        {children}
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CharacterProvider>
        <ThemedLayout />
      </CharacterProvider>
    </ThemeProvider>
  );
}

// Necesitamos este componente intermedio para poder usar el hook useTheme
function ThemedLayout() {
  return (
    <ThemedStack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </ThemedStack>
  );
}