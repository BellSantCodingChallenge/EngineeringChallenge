import { Button, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { useSession } from '../session';

// Define color
const colorPrimaryButton = 'red';

/**
 * Screen component for logging a machine part.
 * @returns {JSX.Element} - Rendered LogPartScreen component.
 */
export default function LogPartScreen () {
  // Retrieve the signOut function from the session context
  const { signOut } = useSession();

  return (
    <View style={ styles.container }>
      <View style={ styles.separator } />

      {/* Button for signing out */ }
      <View style={ styles.signOutButton }>
        <Button color={colorPrimaryButton} title="Sign Out" onPress={ () => signOut() } />
      </View>
    </View>
  );
}

// Styles for the LogPartScreen component
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
  signOutButton: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colorPrimaryButton
  }
} );
