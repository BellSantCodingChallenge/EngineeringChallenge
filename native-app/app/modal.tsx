// Importing necessary components and modules
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

/**
 * Screen component for the modal view.
 * @returns {JSX.Element} - Rendered ModalScreen component.
 */
export default function ModalScreen () {
  return (
    // Main container for the modal screen
    <View style={ styles.container }>
      {/* Title of the modal screen */ }
      <Text style={ styles.title }>Modal</Text>

      {/* Separator line beneath the title */ }
      <View
        style={ styles.separator }
        lightColor='#eee' // Light color in light mode
        darkColor='rgba(255,255,255,0.1)' // Dark color in dark mode
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */ }
      <StatusBar style={ Platform.OS === 'ios' ? 'light' : 'auto' } />
    </View>
  );
}

// Styles for the ModalScreen component
const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
} );
