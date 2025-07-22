import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';

/**
 * Main App Component for Android TV Dashboard
 * Entry point for the React Native application
 */
export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#0a0a0a" />
      <AppNavigator />
    </>
  );
}
