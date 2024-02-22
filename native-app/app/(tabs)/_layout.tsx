import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { useSession } from '../session';
import { Text } from '../../components/Themed';
import { IconButtonProps } from '@expo/vector-icons/build/createIconSet';

type Route = {
  name: string;
  options: {
    title: string;
    tabBarIcon: any; // TODO - set correct type
  };
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // If not signed in require sign in
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  const routes: Route[] = [
    {
      name: 'index',
      options: { title: 'Machine State', tabBarIcon: ({ color }) => <TabBarIcon name="list-ul" color={color} /> },
    },
    {
      name: 'two',
      options: { title: 'Log Part', tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} /> },
    },
    {
      name: 'three',
      options: { title: 'Account', tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} /> },
    },
  ];

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint }}>
      {routes.map(route => (
        <Tabs.Screen key={route.name} name={route.name} options={route.options} />
      ))}
    </Tabs>
  );
}
