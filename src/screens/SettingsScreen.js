import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Header } from '../components/Header';
import { StatusBar } from '../components/StatusBar';
import { FocusableButton } from '../components/FocusableButton';
import { useTVFocus } from '../hooks/useTVFocus';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

/**
 * Settings Screen
 * Configuration options for the Android TV dashboard
 */
export const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    showTime: true,
    autoConnect: true,
    highContrast: false,
    soundEnabled: true,
    notifications: true,
  });

  const settingsOptions = [
    {
      id: 'showTime',
      title: 'Show Time in Header',
      description: 'Display current time in the header',
      type: 'toggle',
    },
    {
      id: 'autoConnect',
      title: 'Auto Connect',
      description: 'Automatically connect to network on startup',
      type: 'toggle',
    },
    {
      id: 'highContrast',
      title: 'High Contrast Mode',
      description: 'Enhanced visibility for better accessibility',
      type: 'toggle',
    },
    {
      id: 'soundEnabled',
      title: 'Sound Effects',
      description: 'Play sound effects for navigation',
      type: 'toggle',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Show system notifications',
      type: 'toggle',
    },
  ];

  const totalFocusableItems = settingsOptions.length + 2; // +2 for reset and back buttons

  const { focusedIndex, isPressed, isFocused } = useTVFocus(
    0,
    totalFocusableItems,
    (index) => {
      if (index < settingsOptions.length) {
        // Toggle setting
        const setting = settingsOptions[index];
        setSettings(prev => ({
          ...prev,
          [setting.id]: !prev[setting.id]
        }));
      } else if (index === settingsOptions.length) {
        // Reset to defaults
        setSettings({
          showTime: true,
          autoConnect: true,
          highContrast: false,
          soundEnabled: true,
          notifications: true,
        });
      } else {
        // Back button
        navigation.goBack();
      }
    },
    () => navigation.goBack() // Back button handler
  );

  const SettingItem = ({ setting, index, value, onToggle }) => (
    <View style={[
      styles.settingItem,
      isFocused(index) && styles.settingItemFocused
    ]}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{setting.title}</Text>
        <Text style={styles.settingDescription}>{setting.description}</Text>
      </View>
      <View style={styles.settingControl}>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={value ? COLORS.text : COLORS.textSecondary}
          style={styles.switch}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Settings" showTime={settings.showTime} />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>App Configuration</Text>
        
        <View style={styles.settingsContainer}>
          {settingsOptions.map((setting, index) => (
            <SettingItem
              key={setting.id}
              setting={setting}
              index={index}
              value={settings[setting.id]}
              onToggle={() => {
                setSettings(prev => ({
                  ...prev,
                  [setting.id]: !prev[setting.id]
                }));
              }}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <FocusableButton
            title="Reset to Defaults"
            icon="🔄"
            onPress={() => {
              setSettings({
                showTime: true,
                autoConnect: true,
                highContrast: false,
                soundEnabled: true,
                notifications: true,
              });
            }}
            isFocused={isFocused(settingsOptions.length)}
            isPressed={isPressed && isFocused(settingsOptions.length)}
            variant="secondary"
            style={styles.resetButton}
          />

          <FocusableButton
            title="Back to Dashboard"
            icon="⬅️"
            onPress={() => navigation.goBack()}
            isFocused={isFocused(settingsOptions.length + 1)}
            isPressed={isPressed && isFocused(settingsOptions.length + 1)}
            variant="outline"
          />
        </View>
      </ScrollView>

      <StatusBar 
        connectionStatus="Connected"
        showNavigationHints={true}
        customInfo="Settings"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.title,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  settingsContainer: {
    marginBottom: SPACING.xl,
  },
  settingItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  settingItemFocused: {
    borderColor: COLORS.focus,
    backgroundColor: COLORS.surface,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    ...TYPOGRAPHY.bodySecondary,
  },
  settingControl: {
    marginLeft: SPACING.lg,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.xl,
  },
  resetButton: {
    marginRight: SPACING.lg,
  },
});
