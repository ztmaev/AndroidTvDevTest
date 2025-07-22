import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Header } from '../components/Header';
import { StatusBar } from '../components/StatusBar';
import { DashboardCard } from '../components/DashboardCard';
import { useTVGridFocus } from '../hooks/useTVFocus';
import { COLORS, SPACING } from '../constants/theme';

/**
 * Home Dashboard Screen
 * Main screen with grid of navigation cards
 */
export const HomeScreen = ({ navigation }) => {
  // Dashboard items configuration
  const dashboardItems = [
    {
      id: 'media',
      title: 'Media Player',
      subtitle: 'Videos & Music',
      icon: '🎬',
      onPress: () => navigation.navigate('Media'),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'App Configuration',
      icon: '⚙️',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'stats',
      title: 'Statistics',
      subtitle: 'Usage Analytics',
      icon: '📊',
      onPress: () => console.log('Stats pressed'),
    },
    {
      id: 'weather',
      title: 'Weather',
      subtitle: 'Current Conditions',
      icon: '🌤️',
      onPress: () => console.log('Weather pressed'),
    },
    {
      id: 'news',
      title: 'News',
      subtitle: 'Latest Updates',
      icon: '📰',
      onPress: () => console.log('News pressed'),
    },
    {
      id: 'games',
      title: 'Games',
      subtitle: 'Entertainment',
      icon: '🎮',
      onPress: () => console.log('Games pressed'),
    },
  ];

  const COLUMNS = 3;
  const ROWS = Math.ceil(dashboardItems.length / COLUMNS);

  const { focusedIndex, isPressed, isFocusedByIndex } = useTVGridFocus(
    ROWS,
    COLUMNS,
    (index) => {
      if (dashboardItems[index]) {
        dashboardItems[index].onPress();
      }
    }
  );

  const renderDashboardCard = ({ item, index }) => (
    <DashboardCard
      title={item.title}
      subtitle={item.subtitle}
      icon={item.icon}
      onPress={item.onPress}
      isFocused={isFocusedByIndex(index)}
      isPressed={isPressed && isFocusedByIndex(index)}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Android TV Dashboard" showTime={true} />
      
      <View style={styles.content}>
        <FlatList
          data={dashboardItems}
          renderItem={renderDashboardCard}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNS}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Disable scroll for TV navigation
        />
      </View>

      <StatusBar 
        connectionStatus="Connected"
        showNavigationHints={true}
        customInfo={`${dashboardItems.length} apps available`}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
});
