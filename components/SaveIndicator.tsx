// components/SaveIndicator.tsx
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedComponents';
import { useTheme } from '../app/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type SaveIndicatorProps = {
  saving: boolean;
};

export default function SaveIndicator({ saving }: SaveIndicatorProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.cardBorder }]}>
      {saving ? (
        <View style={styles.row}>
          <ActivityIndicator size="small" color={colors.primary} style={styles.icon} />
          <ThemedText type="secondary">Guardando cambios...</ThemedText>
        </View>
      ) : (
        <View style={styles.row}>
          <MaterialCommunityIcons name="check-circle" size={18} color={colors.success} style={styles.icon} />
          <ThemedText type="secondary">Todos los cambios guardados</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});