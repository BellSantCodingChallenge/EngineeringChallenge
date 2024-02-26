import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { View } from '../../components/Themed';

/**
 * Screen component for the second tab.
 * @returns {JSX.Element} - Rendered TabTwoScreen component.
 */
export default function TabTwoScreen () {
  return (
    <View style={ styles.container }>
      <View style={ styles.separator } />

      {/* EditScreenInfo component for displaying information about the screen */ }
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

// Styles for the TabTwoScreen component
const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
} );
