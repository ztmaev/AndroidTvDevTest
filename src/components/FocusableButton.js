import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, SHADOWS, SPACING } from '../constants/theme';

/**
 * Focusable button component optimized for TV navigation
 * Shows visual focus indicator and handles press animations
 */
export const FocusableButton = ({ 
  title, 
  onPress, 
  isFocused = false, 
  isPressed = false,
  style = {},
  textStyle = {},
  variant = 'primary',
  disabled = false,
  icon = null,
}) => {
  const animatedScale = new Animated.Value(1);
  const animatedOpacity = new Animated.Value(1);

  React.useEffect(() => {
    if (isPressed) {
      Animated.sequence([
        Animated.timing(animatedScale, {
          toValue: 0.95,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(animatedScale, {
          toValue: 1,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isPressed]);

  React.useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: disabled ? 0.5 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [disabled]);

  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (variant === 'secondary') {
      baseStyle.push(styles.buttonSecondary);
    } else if (variant === 'outline') {
      baseStyle.push(styles.buttonOutline);
    }
    
    if (isFocused) {
      baseStyle.push(styles.buttonFocused);
    }
    
    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    return [...baseStyle, style];
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    if (variant === 'outline') {
      baseStyle.push(styles.buttonTextOutline);
    }
    
    if (disabled) {
      baseStyle.push(styles.buttonTextDisabled);
    }
    
    return [...baseStyle, textStyle];
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: animatedScale }],
        opacity: animatedOpacity,
      }}
    >
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={getTextStyle()}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    minHeight: 60,
    ...SHADOWS.medium,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonFocused: {
    backgroundColor: COLORS.primaryDark,
    borderWidth: 3,
    borderColor: COLORS.focus,
    ...SHADOWS.focus,
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    textAlign: 'center',
  },
  buttonTextOutline: {
    color: COLORS.primary,
  },
  buttonTextDisabled: {
    color: COLORS.textSecondary,
  },
  icon: {
    fontSize: 32,
    marginRight: SPACING.sm,
    color: COLORS.text,
  },
});
