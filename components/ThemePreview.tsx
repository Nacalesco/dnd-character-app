// components/ThemePreview.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedComponents';
import { ThemeColors } from '../app/context/ThemeContext';

interface ThemePreviewProps {
  label: string;
  colors: ThemeColors;
  selected?: boolean;
  onPress: () => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ 
  label,
  colors,
  selected = false,
  onPress
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

const styles = StyleSheet.create({
  themePreview: {
    width: '100%',
    aspectRatio: 2/3,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  previewHeader: {
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  previewDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  previewLine: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  previewBody: {
    height: '65%',
    padding: 12,
    justifyContent: 'center',
  },
  previewCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  previewText: {
    flex: 1,
    height: 20,
    borderRadius: 4,
  },
  previewLabel: {
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
});