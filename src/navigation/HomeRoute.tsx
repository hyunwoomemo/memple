import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import Home from '../screens/in/Home';
import PartyDetail from '../screens/in/party/PartyMain';
import {colors} from '../style';
import PartyDetailRoute from './PartyDetailRoute';
import {useSetCurrentScreen} from '../hooks/useSetCurrentScreen';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {useSetAtom} from 'jotai';
import {currentScreenAtom} from '../store/screen/atom';

type RootStackParamList = {
  Home: undefined;
  PartyDetailRoute: {id: any};
  // PartyDetailRoute: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeRoute = ({route}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PartyDetailRoute" component={PartyDetailRoute} />
    </Stack.Navigator>
  );
};

export default HomeRoute;
