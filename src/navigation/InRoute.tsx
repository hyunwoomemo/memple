import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../style';
import CustomBottomTab from '../components/common/CustomBottomTab';
import MyParty from '../screens/in/MyParty';
import HomeRoute from './HomeRoute';
import PartyDetailRoute from './PartyDetailRoute';
import More from '../screens/in/More';
import MoreRoute from './MoreRoute';
import PartyRoute from './PartyRoute';
import Icon from '@react-native-vector-icons/ionicons';
import {useTheme} from '../hooks/useTheme';

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
              name="people"
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
      {/* <BottomTab.Screen name="PartyDetailRoute" component={PartyDetailRoute} /> */}
    </BottomTab.Navigator>
  );
};

export default InRoute;
