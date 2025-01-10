import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/in/Home';

import {useTheme} from '../hooks/useTheme';
import Manage from '../screens/in/player/Manage';
import Register from '../screens/in/player/Register';

type RootStackParamList = {
  Home: undefined;
  AddParty: undefined;
  Manage: undefined;
  Register: undefined;
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
      <Stack.Screen name="Manage" component={Manage} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default HomeRoute;
