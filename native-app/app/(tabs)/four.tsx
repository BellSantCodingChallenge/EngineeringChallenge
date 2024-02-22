import { Button, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { useSession } from '../session';

export default function LogPartScreen() {
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
