import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/common/CustomBottomTab';
import HomeRoute from './HomeRoute';
import MoreRoute from './MoreRoute';
import PartyRoute from './PartyRoute';
import Icon from '@react-native-vector-icons/ionicons';
import {useTheme} from '../hooks/useTheme';
import {useSocket} from '../hooks/useSocket';
import {useQueryClient} from '@tanstack/react-query';
import {useAtomValue} from 'jotai';
import {userAtom} from '../store/user/atom';

type RootStackParamList = {
  HomeRoute: undefined;
  PartyRoute: undefined;

  MoreRoute: undefined;
};

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const CustomTabBar = (props: any) => {
  return <CustomBottomTab {...props} />;
};

const InRoute = ({route}) => {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="HomeRoute"
        component={HomeRoute}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({focused}) => (
            <Icon
              name="home-outline"
              size={24}
              color={focused ? theme.primary : theme.text}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="PartyRoute"
        component={PartyRoute}
        options={{
          tabBarLabel: '파티 목록',
          tabBarIcon: ({focused}) => (
            <Icon
              name="people-outline"
              size={24}
              color={focused ? theme.primary : theme.text}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MoreRoute"
        component={MoreRoute}
        options={{
          tabBarLabel: '더보기',
          tabBarIcon: ({focused}) => (
            <Icon
              name="ellipsis-horizontal-outline"
              size={24}
              color={focused ? theme.primary : theme.text}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default InRoute;
