# Android TV Dashboard App

A React Native app built with Expo that provides a TV-optimized dashboard interface for Android TV devices.

## Features

### 🎯 TV-Optimized Interface
- **10-foot UI**: Large fonts, high contrast design optimized for viewing from a distance
- **Dark Theme**: Default dark theme with high contrast for better readability
- **Landscape Orientation**: Optimized for TV screen dimensions

### 🎮 TV Remote Navigation
- **D-Pad Support**: Navigate using Up/Down/Left/Right buttons
- **OK Button**: Select focused items
- **Back Button**: Return to previous screen or exit app
- **Visual Focus Indicators**: Clear borders and glow effects show current selection

### 📱 Dashboard Components
- **Header**: App title with real-time clock
- **Grid Layout**: 3x2 grid of large, focusable cards
- **Status Bar**: Connection status, navigation hints, and app info
- **Navigation**: Smooth transitions between screens

### 🏠 Available Screens
1. **Home Dashboard**: Main screen with navigation cards
2. **Media Player**: Placeholder for media functionality
3. **Settings**: Configuration options with toggle switches

## Technical Stack

- **Framework**: React Native with Expo SDK 50+
- **Navigation**: React Navigation v7
- **TV Support**: Custom TV focus management hooks
- **Styling**: Custom theme system with TV-optimized constants

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Run on Android TV**:
   ```bash
   npm run android
   ```

## Android TV Configuration

The app is configured for Android TV with:
- `android.intent.category.LEANBACK_LAUNCHER` intent filter
- Landscape orientation
- TV-specific navigation handling
- Focus management system

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DashboardCard.js # Main dashboard cards
│   ├── FocusableButton.js # TV-focusable buttons
│   ├── Header.js        # App header with title/time
│   └── StatusBar.js     # Bottom status information
├── constants/
│   └── theme.js         # Colors, typography, dimensions
├── hooks/
│   └── useTVFocus.js    # TV remote navigation hooks
├── navigation/
│   └── AppNavigator.js  # Navigation setup
└── screens/             # App screens
    ├── HomeScreen.js    # Main dashboard
    ├── MediaScreen.js   # Media player placeholder
    └── SettingsScreen.js # App settings
```

## TV Focus Management

The app includes custom hooks for TV navigation:

### `useTVFocus`
- Linear focus navigation for lists
- Handles D-Pad, OK, and Back button events
- Provides focus state and press animations

### `useTVGridFocus`
- Grid-based navigation (rows/columns)
- Optimized for dashboard card layouts
- Supports custom grid dimensions

## Components

### `DashboardCard`
Large, focusable cards for the main dashboard with:
- Visual focus indicators
- Press animations
- Icon and text content

### `FocusableButton`
TV-optimized buttons with:
- Multiple variants (primary, secondary, outline)
- Focus states and animations
- Icon support

### `Header` & `StatusBar`
Layout components providing:
- App branding and navigation
- Real-time information display
- Connection status indicators

## Development Notes

- Uses React Native TVEventHandler for remote control input
- All interactive elements support TV focus states
- Optimized for 1080p+ TV resolutions
- Follows Android TV design guidelines

## Testing

Test the app on:
- Android TV emulator
- Physical Android TV device
- Android TV simulator in development

## Future Enhancements

- Add actual media player functionality
- Implement streaming service integrations
- Add voice control support
- Include more dashboard widgets
- Add user customization options
