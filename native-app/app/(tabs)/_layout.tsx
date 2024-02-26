import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { useSession } from '../session';
import { Text } from '../../components/Themed';

// Define the structure of a route
type Route = {
  name: string;
  options: {
    title: string;
    tabBarIcon: any;
  };
};

/**
 * Component rendering a tab bar icon using FontAwesome.
 * @param {Object} props - Props for the TabBarIcon component.
 * @param {string} props.name - The name of the FontAwesome icon.
 * @param {string} props.color - The color of the icon.
 * @returns {JSX.Element} - Rendered TabBarIcon component.
 */
function TabBarIcon ( props: { name: React.ComponentProps<typeof FontAwesome>[ 'name' ]; color: string; } ) {
  return <FontAwesome size={ 28 } style={ { marginBottom: -3 } } { ...props } />;
}

// Main component rendering the tab layout
export default function TabLayout () {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();

  // If still loading session information, display a loading message
  if ( isLoading ) {
    return <Text>Loading...</Text>;
  }

  // If not signed in, redirect to the sign-in page
  if ( !session ) {
    return <Redirect href="/sign-in" />;
  }

  // Define an array of routes with their names and options
  const routes: Route[] = [
    {
      name: 'index',
      options: { title: 'State', tabBarIcon: ( { color } ) => <TabBarIcon name="server" color={ color } /> },
    },
    {
      name: 'two',
      options: { title: 'Log', tabBarIcon: ( { color } ) => <TabBarIcon name="edit" color={ color } /> },
    },
    {
      name: 'three',
      options: { title: 'History', tabBarIcon: ( { color } ) => <TabBarIcon name="history" color={ color } /> },
    },
    {
      name: 'four',
      options: { title: 'Config', tabBarIcon: ( { color } ) => <TabBarIcon name="gear" color={ color } /> },
    },
  ];

  // Render the tab layout using the defined routes
  return (
    <Tabs screenOptions={ { tabBarActiveTintColor: Colors[ colorScheme ?? 'light' ].tint } }>
      { routes.map( route => (
        <Tabs.Screen key={ route.name } name={ route.name } options={ route.options } />
      ) ) }
    </Tabs>
  );
}
