import { useState, useEffect, useRef } from 'react';
import { TVEventHandler, Platform } from 'react-native';

/**
 * Custom hook for managing TV remote focus and navigation
 * Handles D-Pad navigation, OK button, and Back button events
 */
export const useTVFocus = (initialFocusIndex = 0, itemCount = 0, onSelect = null, onBack = null) => {
  const [focusedIndex, setFocusedIndex] = useState(initialFocusIndex);
  const [isPressed, setIsPressed] = useState(false);
  const tvEventHandler = useRef(null);

  useEffect(() => {
    if (Platform.isTV) {
      // Create TV event handler for remote control
      tvEventHandler.current = new TVEventHandler();
      
      tvEventHandler.current.enable(null, (cmp, evt) => {
        const { eventType, eventKeyAction } = evt;
        
        // Only handle key down events to avoid double triggers
        if (eventKeyAction === 1) { // Key down
          switch (eventType) {
            case 'right':
              setFocusedIndex(prev => (prev + 1) % itemCount);
              break;
            case 'left':
              setFocusedIndex(prev => (prev - 1 + itemCount) % itemCount);
              break;
            case 'up':
              // Move up in grid (assuming 3 columns)
              setFocusedIndex(prev => {
                const newIndex = prev - 3;
                return newIndex >= 0 ? newIndex : prev;
              });
              break;
            case 'down':
              // Move down in grid (assuming 3 columns)
              setFocusedIndex(prev => {
                const newIndex = prev + 3;
                return newIndex < itemCount ? newIndex : prev;
              });
              break;
            case 'select':
            case 'playPause':
              setIsPressed(true);
              if (onSelect) {
                onSelect(focusedIndex);
              }
              // Reset pressed state after animation
              setTimeout(() => setIsPressed(false), 150);
              break;
            case 'menu':
            case 'back':
              if (onBack) {
                onBack();
              }
              break;
          }
        }
      });
    }

    return () => {
      if (tvEventHandler.current) {
        tvEventHandler.current.disable();
      }
    };
  }, [itemCount, focusedIndex, onSelect, onBack]);

  // Function to manually set focus (useful for navigation between screens)
  const setFocus = (index) => {
    if (index >= 0 && index < itemCount) {
      setFocusedIndex(index);
    }
  };

  // Function to check if an item is focused
  const isFocused = (index) => focusedIndex === index;

  return {
    focusedIndex,
    isPressed,
    setFocus,
    isFocused,
    isTV: Platform.isTV,
  };
};

/**
 * Hook for managing grid navigation with custom rows and columns
 */
export const useTVGridFocus = (rows, columns, onSelect = null, onBack = null) => {
  const [focusedRow, setFocusedRow] = useState(0);
  const [focusedCol, setFocusedCol] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const tvEventHandler = useRef(null);

  const totalItems = rows * columns;
  const focusedIndex = focusedRow * columns + focusedCol;

  useEffect(() => {
    if (Platform.isTV) {
      tvEventHandler.current = new TVEventHandler();
      
      tvEventHandler.current.enable(null, (cmp, evt) => {
        const { eventType, eventKeyAction } = evt;
        
        if (eventKeyAction === 1) { // Key down
          switch (eventType) {
            case 'right':
              setFocusedCol(prev => (prev + 1) % columns);
              break;
            case 'left':
              setFocusedCol(prev => (prev - 1 + columns) % columns);
              break;
            case 'up':
              setFocusedRow(prev => (prev - 1 + rows) % rows);
              break;
            case 'down':
              setFocusedRow(prev => (prev + 1) % rows);
              break;
            case 'select':
            case 'playPause':
              setIsPressed(true);
              if (onSelect) {
                onSelect(focusedIndex, focusedRow, focusedCol);
              }
              setTimeout(() => setIsPressed(false), 150);
              break;
            case 'menu':
            case 'back':
              if (onBack) {
                onBack();
              }
              break;
          }
        }
      });
    }

    return () => {
      if (tvEventHandler.current) {
        tvEventHandler.current.disable();
      }
    };
  }, [rows, columns, focusedRow, focusedCol, onSelect, onBack]);

  const isFocused = (row, col) => focusedRow === row && focusedCol === col;
  const isFocusedByIndex = (index) => index === focusedIndex;

  return {
    focusedRow,
    focusedCol,
    focusedIndex,
    isPressed,
    isFocused,
    isFocusedByIndex,
    isTV: Platform.isTV,
  };
};
