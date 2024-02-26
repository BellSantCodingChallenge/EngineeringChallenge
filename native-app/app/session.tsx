// Importing necessary modules and components
import React from 'react';
import { useStorageState } from './secureStorageState';
import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';

/**
 * Context for authentication-related information.
 */
const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | undefined;
  isLoading: boolean;
}>( {
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
} );

/**
 * Hook to access the user session information.
 * @returns {Object} - Authentication context values.
 */
export function useSession () {
  const value = React.useContext( AuthContext );

  // Check if the hook is used within a SessionProvider
  if ( process.env.NODE_ENV !== 'production' ) {
    if ( !value ) {
      throw new Error( 'useSession must be wrapped in a <SessionProvider />' );
    }
  }

  return value;
}

/**
 * Provider component to manage user authentication session.
 * @param {React.PropsWithChildren} props - React component properties with children.
 * @returns {React.ReactNode} - React component providing authentication context.
 */
export function SessionProvider ( props: React.PropsWithChildren ) {
  // State hook for session information
  const [ [ isLoading, session ], setSession ] = useStorageState( 'session' );

  return (
    <AuthContext.Provider
      value={ {
        // Function to sign in using Apple Authentication
        signIn: async () => {
          try {
            const credential = await AppleAuthentication.signInAsync( {
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            } );

            // Save the session in storage and redirect to the home screen
            setSession( JSON.stringify( credential ) );
            router.replace( '/' );
          } catch ( e ) {
            console.log( 'auth error', { e } );

            // Handle user cancellation or other errors
            if ( e.code === 'ERR_REQUEST_CANCELED' ) {
              // Handle user cancellation
            } else {
              // Handle other errors
            }
          }
        },

        // Function to sign out by clearing the session in storage
        signOut: () => {
          setSession( null );
        },

        // Session information and loading status
        session,
        isLoading,
      } }
    >
      { props.children }
    </AuthContext.Provider>
  );
}
