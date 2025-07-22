import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, DIMENSIONS } from '../constants/theme';

/**
 * Status bar component for the bottom of the screen
 * Shows connection status, navigation hints, and other info
 */
export const StatusBar = ({ 
  connectionStatus = 'Connected', 
  showNavigationHints = true,
  customInfo = null 
}) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'connected':
        return COLORS.success;
      case 'connecting':
        return COLORS.warning;
      case 'disconnected':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.statusIndicator}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: getStatusColor(connectionStatus) }
          ]} />
          <Text style={styles.statusText}>{connectionStatus}</Text>
        </View>
      </View>

      {showNavigationHints && (
        <View style={styles.centerSection}>
          <Text style={styles.hintText}>
            Use D-Pad to navigate • OK to select • Back to return
          </Text>
        </View>
      )}

      <View style={styles.rightSection}>
        {customInfo ? (
          <Text style={styles.infoText}>{customInfo}</Text>
        ) : (
          <Text style={styles.infoText}>Android TV Dashboard v1.0</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DIMENSIONS.statusBarHeight,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  statusText: {
    ...TYPOGRAPHY.bodySecondary,
  },
  hintText: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
  },
  infoText: {
    ...TYPOGRAPHY.caption,
  },
});
