import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {colors} from '../style';
import AddParty from '../screens/in/party/AddParty';
import Party from '../screens/in/party/Party';

type RootStackParamList = {
  Party: undefined;
  AddParty: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const PartyRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.dark.background},
      }}>
      <Stack.Screen name="Party" component={Party} />
      <Stack.Screen
        name="AddParty"
        component={AddParty}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default PartyRoute;
