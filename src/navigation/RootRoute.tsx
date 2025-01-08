import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, useColorScheme, View} from 'react-native';
import InRoute from './InRoute';
import OutRoute from './OutRoute';
import {colors} from '../style';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {userAtom} from '../store/user/atom';
import {playerApi, userApi} from '../api';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getStorage, removeStorage, setStorage} from '../store/asyncStorage';
import PartyDetailRoute from './PartyDetailRoute';
import {appAtom, setTheme} from '../store/app/atom';
import {useTheme} from '../hooks/useTheme';
import {useSocket} from '../hooks/useSocket';
import BottomSheet from '../components/common/BottomSheet';

const Stack = createNativeStackNavigator();

const RootRoute = () => {
  const systemTheme = useColorScheme();
  const setThemeAtom = useSetAtom(setTheme);
  const [app, setApp] = useAtom(appAtom);
  const [isVisible, setIsVisible] = useState(true);

  const theme = useTheme();
  const styles = createStyles(theme);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useAtom(userAtom);

  // removeStorage('token');

  useEffect(() => {
    const fetch = async () => {
      const token = await getStorage('token');
      const storedTheme = await getStorage('theme');
      setThemeAtom(storedTheme || systemTheme || '');

      if (token) {
        const [userRes, playerRes] = await Promise.all([
          userApi.getInfo(),
          playerApi.selectedPlayer(),
        ]);

        console.log('userRes', userRes, playerRes);

        if (userRes.success) {
          if (playerRes.success) {
            setUser({info: userRes.user, player: playerRes.data});
          } else {
            setUser({info: userRes.user, player: {}});
          }
        }
      }

      setIsLoading(false);
    };

    fetch();
  }, [setUser, setThemeAtom, systemTheme]);

  useEffect(() => {
    if (app.error) {
      Alert.alert(app.error.message);
    }
  }, [app]);

  return (
    <>
      {isLoading ? (
        <View style={styles.splash}>
          <Text style={styles.whiteText}>스플래시 !!</Text>
        </View>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {user?.info && Object.keys(user?.info).length > 0 ? (
            <>
              <Stack.Screen
                name="InRoute"
                component={InRoute}
                options={{contentStyle: {backgroundColor: theme.background}}}
              />
              <Stack.Screen
                name="PartyDetailRoute"
                component={PartyDetailRoute}
              />
            </>
          ) : (
            <Stack.Screen name="OutRoute" component={OutRoute} />
          )}
        </Stack.Navigator>
      )}
      {app.bottomSheet.visible && (
        <BottomSheet
          trigger={app.bottomSheet.visible}
          setTrigger={() =>
            setApp(prev => ({
              ...prev,
              bottomSheet: {visible: false, body: null},
            }))
          }>
          {app.bottomSheet.body()}
        </BottomSheet>
      )}
    </>
  );
};

export default RootRoute;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    splash: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    whiteText: {
      color: theme.white,
    },
  });
};
