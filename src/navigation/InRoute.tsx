import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../style';
import CustomBottmTab from '../components/common/CustomBottmTab';
import MyParty from '../screens/in/MyParty';
import HomeRoute from './HomeRoute';
import PartyDetailRoute from './PartyDetailRoute';
import More from '../screens/in/More';
import MoreRoute from './MoreRoute';

type RootStackParamList = {
  PartyList: undefined;
  MyParty: undefined;
  PartyDetailRoute: {item: any};
  More: undefined;
};

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const CustomTabBar = (props: any) => {
  return <CustomBottmTab {...props} />;
};

const InRoute = () => {
  return (
    <BottomTab.Navigator
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
        sceneStyle: {flex: 1, backgroundColor: colors.background},
      }}>
      <BottomTab.Screen
        name="PartyList"
        component={HomeRoute}
        options={{tabBarLabel: '파티 목록'}}
      />
      <BottomTab.Screen
        name="MyParty"
        component={MyParty}
        options={{tabBarLabel: '내 파티'}}
      />
      <BottomTab.Screen
        name="MoreRoute"
        component={MoreRoute}
        options={{tabBarLabel: '더보기'}}
      />
      {/* <BottomTab.Screen name="PartyDetailRoute" component={PartyDetailRoute} /> */}
    </BottomTab.Navigator>
  );
};

export default InRoute;
