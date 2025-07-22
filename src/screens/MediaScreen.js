import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { StatusBar } from '../components/StatusBar';
import { FocusableButton } from '../components/FocusableButton';
import { useTVFocus } from '../hooks/useTVFocus';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

/**
 * Media Player Screen
 * Placeholder screen for media functionality
 */
export const MediaScreen = ({ navigation }) => {
  const mediaOptions = [
    { id: 'videos', title: 'My Videos', icon: '🎥' },
    { id: 'music', title: 'Music Library', icon: '🎵' },
    { id: 'photos', title: 'Photo Gallery', icon: '📷' },
    { id: 'streaming', title: 'Streaming Apps', icon: '📺' },
  ];

  const { focusedIndex, isPressed, isFocused } = useTVFocus(
    0,
    mediaOptions.length + 1, // +1 for back button
    (index) => {
      if (index === mediaOptions.length) {
        // Back button pressed
        navigation.goBack();
      } else {
        console.log(`Selected: ${mediaOptions[index].title}`);
      }
    },
    () => navigation.goBack() // Back button handler
  );

  return (
    <View style={styles.container}>
      <Header title="Media Player" showTime={true} />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.description}>
          Welcome to the Media Player. Choose from the options below to access your media content.
        </Text>

        <View style={styles.optionsContainer}>
          {mediaOptions.map((option, index) => (
            <FocusableButton
              key={option.id}
              title={option.title}
              icon={option.icon}
              onPress={() => console.log(`Selected: ${option.title}`)}
              isFocused={isFocused(index)}
              isPressed={isPressed && isFocused(index)}
              style={styles.optionButton}
            />
          ))}
        </View>

        <View style={styles.backButtonContainer}>
          <FocusableButton
            title="Back to Dashboard"
            icon="⬅️"
            onPress={() => navigation.goBack()}
            isFocused={isFocused(mediaOptions.length)}
            isPressed={isPressed && isFocused(mediaOptions.length)}
            variant="outline"
          />
        </View>
      </ScrollView>

      <StatusBar 
        connectionStatus="Connected"
        showNavigationHints={true}
        customInfo="Media Player"
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
    alignItems: 'center',
  },
  description: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    maxWidth: 800,
  },
  optionsContainer: {
    width: '100%',
    maxWidth: 600,
    marginBottom: SPACING.xl,
  },
  optionButton: {
    marginBottom: SPACING.lg,
    width: '100%',
  },
  backButtonContainer: {
    marginTop: SPACING.xl,
  },
});
