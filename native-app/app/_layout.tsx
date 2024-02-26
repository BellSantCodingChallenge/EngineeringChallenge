import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SessionProvider } from './session';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * Root layout component responsible for initializing fonts and handling the splash screen.
 * @returns {JSX.Element | null} - Rendered RootLayout component or null if fonts are not loaded.
 */
export default function RootLayout () {
  // Load fonts
  const [ loaded, error ] = useFonts( {
    SpaceMono: require( '../assets/fonts/SpaceMono-Regular.ttf' ),
    ...FontAwesome.font,
  } );

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect( () => {
    if ( error ) throw error;
  }, [ error ] );

  // Hide splash screen when fonts are loaded
  useEffect( () => {
    if ( loaded ) {
      SplashScreen.hideAsync();
    }
  }, [ loaded ] );

  // Return null if fonts are not loaded
  if ( !loaded ) {
    return null;
  }

  // Render the main navigation layout
  return <RootLayoutNav />;
}

/**
 * Root navigation layout component wrapping the main navigation stack and theme provider.
 * @returns {JSX.Element} - Rendered RootLayoutNav component.
 */
function RootLayoutNav () {
  // Get color scheme
  const colorScheme = useColorScheme();

  // Return the main navigation stack wrapped with the theme provider
  return (
    <SessionProvider>
      <ThemeProvider value={ colorScheme === 'dark' ? DarkTheme : DefaultTheme }>
        {/* Main navigation stack */ }
        <Stack>
          <Stack.Screen name="(tabs)" options={ { headerShown: false } } />
          <Stack.Screen name="modal" options={ { presentation: 'modal' } } />
        </Stack>
      </ThemeProvider>
    </SessionProvider>
  );
}
