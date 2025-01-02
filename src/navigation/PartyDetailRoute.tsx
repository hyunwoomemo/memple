import React, {useCallback} from 'react';
import PartyMain from '../screens/in/party/PartyMain';
import {colors} from '../style';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomChatTab from '../components/common/CustomChatTab';
import PartyChat from '../screens/in/party/PartyChat';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CText from '../components/common/CText';
import Screen from '../components/common/Screen';

type RootStackParamList = {
  PartyMain: {id: any};
  PartyChat: any;
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const PartyDetailRoute = ({route}: {route: {params: {item: any}}}) => {
  console.log('rrr', route);

  const PartyMainComponent = useCallback(
    () => <PartyMain item={route.params.item} />,
    [route],
  );
  const PartyChatComponent = useCallback(
    () => <PartyChat item={route.params.item} />,
    [route],
  );

  console.log(route.params);
  return (
    <Screen name={route.params.item.title} nameSize={16}>
      <Tab.Navigator
        // tabBar={CustomChatTab}
        screenOptions={{
          // headerShown: false,
          // contentStyle: {backgroundColor: colors.background},
          tabBarStyle: {backgroundColor: colors.background},
          tabBarLabelStyle: {color: colors.white},
          tabBarIndicatorStyle: {backgroundColor: colors.darkRed},
          sceneStyle: {flex: 1, backgroundColor: colors.background},
        }}>
        <Tab.Screen
          options={{tabBarLabel: '정보'}}
          name="PartyMain"
          component={PartyMainComponent}
        />
        <Tab.Screen
          options={{tabBarLabel: '채팅'}}
          name="PartyChat"
          component={PartyChatComponent}
        />
      </Tab.Navigator>
    </Screen>
  );
};

export default PartyDetailRoute;
