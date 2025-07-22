import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, SHADOWS, SPACING, DIMENSIONS } from '../constants/theme';

/**
 * Dashboard card component for the main grid
 * Optimized for TV navigation with focus states
 */
export const DashboardCard = ({ 
  title, 
  subtitle = '', 
  icon = '📱', 
  onPress, 
  isFocused = false, 
  isPressed = false,
  style = {},
}) => {
  const animatedScale = new Animated.Value(1);
  const animatedGlow = new Animated.Value(0);

  React.useEffect(() => {
    if (isPressed) {
      Animated.sequence([
        Animated.timing(animatedScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animatedScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isPressed]);

  React.useEffect(() => {
    Animated.timing(animatedGlow, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: animatedScale }],
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.glowContainer,
          {
            opacity: animatedGlow,
          },
        ]}
      />
      <TouchableOpacity
        style={[
          styles.card,
          isFocused && styles.cardFocused,
        ]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIMENSIONS.cardWidth,
    height: DIMENSIONS.cardHeight,
    margin: SPACING.sm,
  },
  glowContainer: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: COLORS.focusGlow,
    borderRadius: 16,
    zIndex: 0,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.medium,
    zIndex: 1,
  },
  cardFocused: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.focus,
    borderWidth: 3,
    ...SHADOWS.focus,
  },
  iconContainer: {
    marginBottom: SPACING.md,
  },
  icon: {
    fontSize: 48,
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.subtitle,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySecondary,
    textAlign: 'center',
  },
});
