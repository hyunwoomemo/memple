import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/out/Login';
import {colors} from '../style';
import {useTheme} from '../hooks/useTheme';

const Stack = createNativeStackNavigator();

const OutRoute = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.background},
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default OutRoute;
