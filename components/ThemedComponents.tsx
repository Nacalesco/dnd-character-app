// components/ThemedComponents.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle, 
  StyleProp,
  StyleSheet 
} from 'react-native';
import { useTheme } from '../app/context/ThemeContext';

// Componente View con tema
type ThemedViewProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  card?: boolean;
};

export function ThemedView({ style, children, card = false }: ThemedViewProps) {
  const { colors } = useTheme();
  
  return (
    <View 
      style={[
        { backgroundColor: card ? colors.card : colors.background },
        card && { borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 8 },
        style
      ]}
    >
      {children}
    </View>
  );
}

// Componente ScrollView con tema
type ThemedScrollViewProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function ThemedScrollView({ style, children, contentContainerStyle, ...props }: ThemedScrollViewProps & React.ComponentProps<typeof ScrollView>) {
  const { colors } = useTheme();
  
  return (
    <ScrollView 
      style={[{ backgroundColor: colors.background }, style]}
      contentContainerStyle={contentContainerStyle}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

// Componente Text con tema
type ThemedTextProps = {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  type?: 'default' | 'secondary' | 'muted' | 'title' | 'subtitle';
};

export function ThemedText({ style, children, type = 'default', ...props }: ThemedTextProps & React.ComponentProps<typeof Text>) {
  const { colors } = useTheme();
  
  let textStyle: TextStyle = { color: colors.text };
  
  switch (type) {
    case 'secondary':
      textStyle = { color: colors.textSecondary };
      break;
    case 'muted':
      textStyle = { color: colors.textMuted };
      break;
    case 'title':
      textStyle = { color: colors.text, fontSize: 18, fontWeight: 'bold' };
      break;
    case 'subtitle':
      textStyle = { color: colors.textSecondary, fontSize: 16 };
      break;
  }
  
  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
}

// Componente TextInput con tema
type ThemedTextInputProps = {
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export function ThemedTextInput({ style, containerStyle, ...props }: ThemedTextInputProps & React.ComponentProps<typeof TextInput>) {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput 
        style={[
          styles.input, 
          { 
            color: colors.text,
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder
          },
          style
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
}

// Componente de botón con tema
type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  icon?: React.ReactNode;
};

export function ThemedButton({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  variant = 'primary',
  icon
}: ThemedButtonProps) {
  const { colors } = useTheme();
  
  let buttonStyle: ViewStyle = {};
  let buttonTextStyle: TextStyle = {};
  
  switch (variant) {
    case 'primary':
      buttonStyle = {
        backgroundColor: colors.primary,
      };
      buttonTextStyle = {
        color: '#FFFFFF'
      };
      break;
    case 'secondary':
      buttonStyle = {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.cardBorder
      };
      buttonTextStyle = {
        color: colors.text
      };
      break;
    case 'outline':
      buttonStyle = {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary
      };
      buttonTextStyle = {
        color: colors.primary
      };
      break;
    case 'danger':
      buttonStyle = {
        backgroundColor: colors.danger
      };
      buttonTextStyle = {
        color: '#FFFFFF'
      };
      break;
  }
  
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
    >
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
      <Text style={[styles.buttonText, buttonTextStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  }
});