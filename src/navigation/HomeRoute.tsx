import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/in/Home';
import {colors} from '../style';
import PartyDetailRoute from './PartyDetailRoute';
import AddParty from '../screens/in/party/AddParty';

type RootStackParamList = {
  Home: undefined;
  PartyDetailRoute: {item: any};
  AddParty: undefined;
  // PartyDetailRoute: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="AddParty"
        component={AddParty}
        options={{
          presentation: 'modal',
          // animationMatchesGesture: true,
        }}
      />
      <Stack.Screen name="PartyDetailRoute" component={PartyDetailRoute} />
    </Stack.Navigator>
  );
};

export default HomeRoute;
