import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InRoute from './InRoute';
import OutRoute from './OutRoute';
import {colors} from '../style';
import {useAtom, useAtomValue} from 'jotai';
import {userAtom} from '../store/user/atom';
import {playerApi, userApi} from '../api';
import {useQuery} from '@tanstack/react-query';
import {getStorage} from '../store/asyncStorage';

const Stack = createNativeStackNavigator();

const RootRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const fetch = async () => {
      const token = await getStorage('token');
      console.log('fetch');
      if (token) {
        const [userRes, playerRes] = await Promise.all([
          userApi.getInfo(),
          playerApi.selectedPlayer(),
        ]);

        if (userRes.success) {
          if (playerRes.success) {
            setUser({info: userRes.user, player: playerRes.data});
            console.log('player', playerRes);
          } else {
            setUser({info: userRes.user, player: {}});
          }
        }
      }

      setIsLoading(false);
    };

    fetch();
  }, []);

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
            <Stack.Screen name="InRoute" component={InRoute} />
          ) : (
            <Stack.Screen name="OutRoute" component={OutRoute} />
          )}
        </Stack.Navigator>
      )}
    </>
  );
};

export default RootRoute;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: colors.white,
  },
});
