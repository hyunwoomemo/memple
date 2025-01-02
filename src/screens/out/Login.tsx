import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAtom} from 'jotai';

import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from '@react-native-seoul/kakao-login';
import {userApi, playerApi} from '../../api';
import Input from '../../components/common/Input';
import CText from '../../components/common/CText';
import {userAtom} from '../../store/user/atom';
import {getStorage, setStorage} from '../../store/asyncStorage';

const Login = ({navigation}) => {
  const [values, setValues] = useState({});
  const [user, setUser] = useAtom(userAtom);

  const handleChangeText = (type, value) => {
    setValues(prev => ({...prev, [type]: value}));
  };

  const handleLogin = async () => {
    try {
      const res = await playerApi.login({
        name: values.name,
        server: values.server,
      });

      if (res.success) {
        setUser(prev => ({
          ...prev,
          info: {name: values.name, server: values.server},
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithKakao = async () => {
    try {
      const token = await login();
      console.log(token);

      const res = await userApi.kakaoLogin({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });

      console.log('resresresresresresres', res);

      if (res.CODE === 'KRL000' || res.CODE === 'KL000') {
        setStorage('token', res.TOKEN.accessToken);
        setStorage('refreshToken', res.TOKEN.refreshToken);
        setStorage('userId', String(res.DATA.info.user_id));

        playerApi.selectedPlayer().then(players => {
          console.log('players', players);
          setUser({
            ...user,
            info: res.DATA.info,
            player: players.data,
          });
        });

        // setUser({
        //   ...user,
        //   info: res.DATA.info,
        // });
      }
    } catch (err) {
      console.error('login err', err);
    }
  };

  const getProfile = async () => {
    try {
      const profile = await getKakaoProfile();

      console.log(profile);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const unlinkKakao = async () => {
    try {
      const message = await unlink();

      console.log(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Input
        placeholder="id"
        onChangeText={text => handleChangeText('name', text)}
      />
      <Input
        placeholder="password"
        secureTextEntry
        onChangeText={text => handleChangeText('server', text)}
      />
      <Button title="로그인" onPress={handleLogin} />
      {/* <Button title="회원가입" onPress={() => navigation.navigate('Join')} /> */}
      <Button title="카카오로그인" onPress={signInWithKakao} />
      <Button title="카카오프로필" onPress={getProfile} />
      <Button title="카카오로그아웃" onPress={unlinkKakao} />
    </View>
  );
};

export default Login;
