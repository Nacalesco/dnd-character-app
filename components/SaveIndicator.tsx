// app/components/SaveIndicator.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SaveIndicator({ saving }: { saving: boolean }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (saving) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          delay: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [saving]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <MaterialCommunityIcons name="content-save" size={16} color="#4CAF50" />
      <Text style={styles.text}>Guardando...</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginLeft: 4,
    color: '#4CAF50',
  },
});