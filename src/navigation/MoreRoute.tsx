import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import More from '../screens/in/More';
import {colors} from '../style';
import Register from '../screens/in/player/Register';
import Manage from '../screens/in/player/Manage';

const Stack = createNativeStackNavigator();

const MoreRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Manage" component={Manage} />
    </Stack.Navigator>
  );
};

export default MoreRoute;
