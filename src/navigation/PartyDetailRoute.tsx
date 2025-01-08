import React, {useCallback, useEffect} from 'react';
import PartyMain from '../screens/in/party/PartyMain';
import PartyChat from '../screens/in/party/PartyChat';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Screen from '../components/common/Screen';
import {useAtom} from 'jotai';
import {isVisibleBottomTabAtom} from '../store/screen/atom';
import {useTheme} from '../hooks/useTheme';

type RootStackParamList = {
  PartyMain: {id: any};
  PartyChat: any;
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const PartyDetailRoute = ({route}: {route: {params: {item: any}}}) => {
  const theme = useTheme();

  const [isVisibleBottomTab, setIsVisibleBottomTab] = useAtom(
    isVisibleBottomTabAtom,
  );

  useEffect(() => {
    setIsVisibleBottomTab(false);

    return () => {
      setIsVisibleBottomTab(true);
    };
  }, []);

  const PartyMainComponent = () => <PartyMain item={route.params.item} />;
  const PartyChatComponent = useCallback(
    () => <PartyChat item={route.params.item} />,
    [route],
  );

  return (
    <Screen
      back
      name={route.params.item.title}
      nameSize={16}
      // side={() => <Icon name="exit-outline" size={24} />}
    >
      <Tab.Navigator
        // tabBar={CustomChatTab}
        screenOptions={{
          // headerShown: false,
          // contentStyle: {backgroundColor: theme.background},
          tabBarStyle: {
            backgroundColor: theme.background,
            // borderTopWidth: 1,
            // borderBottomWidth: 1,
            // borderColor: theme.backgroundDarker,
          },
          tabBarLabelStyle: {color: theme.text},
          tabBarIndicatorStyle: {backgroundColor: theme.primary},
          sceneStyle: {flex: 1, backgroundColor: theme.background},
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
