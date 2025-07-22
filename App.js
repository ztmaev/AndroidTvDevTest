import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { MediaScreen } from './src/screens/MediaScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { COLORS } from './src/constants/theme';

/**
 * Main App Component for Android TV Dashboard
 * Entry point with simplified state-based navigation
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const navigation = {
    navigate: (screenName) => setCurrentScreen(screenName),
    goBack: () => setCurrentScreen('Home'),
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Media':
        return <MediaScreen navigation={navigation} />;
      case 'Settings':
        return <SettingsScreen navigation={navigation} />;
      default:
        return <HomeScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0a0a0a" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
