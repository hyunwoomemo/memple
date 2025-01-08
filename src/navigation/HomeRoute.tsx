import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/in/Home';

import {useTheme} from '../hooks/useTheme';
import Manage from '../screens/in/player/Manage';

type RootStackParamList = {
  Home: undefined;
  AddParty: undefined;
  Manage: undefined;
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
    </Stack.Navigator>
  );
};

export default HomeRoute;
