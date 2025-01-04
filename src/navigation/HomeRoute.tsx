import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/in/Home';
import {colors} from '../style';
import PartyDetailRoute from './PartyDetailRoute';
import AddParty from '../screens/in/party/AddParty';
import {useTheme} from '../hooks/useTheme';

type RootStackParamList = {
  Home: undefined;
  PartyDetailRoute: {item: any};
  AddParty: undefined;
  // PartyDetailRoute: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeRoute = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.background},
      }}>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen
        name="AddParty"
        component={AddParty}
        options={{
          presentation: 'modal',
          // animationMatchesGesture: true,
        }}
      /> */}
      {/* <Stack.Screen options={{}} name="PartyDetailRoute" component={PartyDetailRoute} /> */}
    </Stack.Navigator>
  );
};

export default HomeRoute;
