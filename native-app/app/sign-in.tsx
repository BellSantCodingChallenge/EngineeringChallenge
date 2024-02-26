// Importing necessary modules and components
import * as AppleAuthentication from 'expo-apple-authentication';
import { View } from 'react-native';
import { useSession } from './session';

/**
 * Sign-in screen component using Apple Authentication.
 * @returns {React.ReactNode} - React component for sign-in screen.
 */
export default function SignIn () {
  // Access the signIn function from the authentication context
  const { signIn } = useSession();

  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
      {/* Apple Authentication button component */ }
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={ AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN }
        buttonStyle={ AppleAuthentication.AppleAuthenticationButtonStyle.BLACK }
        cornerRadius={ 5 }
        style={ { width: 200, height: 64 } }
        onPress={ () => signIn() }
      />
    </View>
  );
}
