// Theme constants optimized for Android TV
export const COLORS = {
  // Dark theme with high contrast
  background: '#0a0a0a',
  surface: '#1a1a1a',
  primary: '#2196f3',
  primaryDark: '#1976d2',
  secondary: '#ff9800',
  accent: '#4caf50',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  border: '#333333',
  focus: '#2196f3',
  focusGlow: 'rgba(33, 150, 243, 0.3)',
  error: '#f44336',
  warning: '#ff9800',
  success: '#4caf50',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const TYPOGRAPHY = {
  // Large fonts for 10-foot UI
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.text,
  },
  body: {
    fontSize: 24,
    fontWeight: 'normal',
    color: COLORS.text,
  },
  bodySecondary: {
    fontSize: 20,
    fontWeight: 'normal',
    color: COLORS.textSecondary,
  },
  button: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.text,
  },
  caption: {
    fontSize: 18,
    fontWeight: 'normal',
    color: COLORS.textSecondary,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  focus: {
    shadowColor: COLORS.focus,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
};

export const DIMENSIONS = {
  // Card dimensions optimized for TV
  cardWidth: 280,
  cardHeight: 200,
  headerHeight: 100,
  statusBarHeight: 60,
  gridGap: 32,
};
