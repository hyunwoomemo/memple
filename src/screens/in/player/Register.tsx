import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import Screen from '../../../components/common/Screen';
import CText from '../../../components/common/CText';
import {colors} from '../../../style';
import CButton from '../../../components/common/CButton';
import {playerApi} from '../../../api';
import {useAtom} from 'jotai';
import {userAtom} from '../../../store/user/atom';
import Input from '../../../components/common/Input';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ResultItem = ({title, contents}: {title: string; contents: string}) => {
  return (
    <View style={styles.result}>
      <CText color={colors.gray}>{title}</CText>
      <View style={styles.resultContents}>
        <CText color={colors.white}>{contents}</CText>
      </View>
    </View>
  );
};

const Register = () => {
  const [values, setValues] = React.useState({
    name: '',
    server: '',
  });

  const [ocid, setOcid] = useState('');
  const [playerData, setPlayerData] = useState({});

  const [user, setUser] = useAtom(userAtom);
  const [playerId, setPlayerId] = useState(-1);

  const handleRegister = async () => {
    const res = await playerApi.getOcid({
      character_name: values.name,
      world_name: values.server,
    });

    console.log('getOcid', res);

    if (res?.ocid) {
      console.log('next');
      setOcid(res?.ocid);
      // setUser(prev => ({
      //   ...prev,
      //   info: {name: values.name, server: values.server},
      // }));
      // 스카니아
      // 이쟌
      const playerInfo = await playerApi.info({ocid: res.ocid});

      console.log('playerInfo', playerInfo);
      if (playerInfo) {
        setPlayerData(playerInfo.user);
        // const setInfoRes = await playerApi.setInfo({
        //   ...playerInfo,
        //   ocid: res.ocid,
        // });

        // console.log('setInfoRessetInfoRes', setInfoRes);
      }
    } else {
      Alert.alert('캐릭터 정보를 찾을 수 없습니다.');
    }
  };
  // 스카니아;
  // 이쟌;
  // const {data: playerInfo} = useQuery({
  //   queryKey: ['playerInfo', ocid],
  //   queryFn: () => playerApi.info({ocid}),
  //   enabled: !!ocid,
  // });

  // console.log('playerInfo', playerInfo);

  const handleRegisterCharacter = async () => {
    if (!playerData) {
      return;
    }

    const res = await playerApi.register({
      ocid,
      name: playerData.character_name,
      character_job: playerData.character_job_name,
      level: playerData.character_level,
      world_name: playerData.world_name,
    });

    // setPlayerId(res);

    console.log('rrr', res);

    if (res.success) {
      Alert.alert('등록되었습니다.');
    } else {
      Alert.alert('등록에 실패했습니다.');
    }
  };

  // 스카니아
  // 디오이
  // useEffect(() => {
  //   if (playerId) {
  //     f
  //   }
  // }, [playerId])

  return (
    <Screen name="캐릭터 등록" back>
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer}>
        {!ocid ? (
          <>
            <View style={styles.container}>
              <View style={styles.inputWrapper}>
                <Input
                  placeholder="서버"
                  onChangeText={text =>
                    setValues(prev => ({...prev, server: text}))
                  }
                />
                <Input
                  placeholder="유저 이름"
                  onChangeText={text =>
                    setValues(prev => ({...prev, name: text}))
                  }
                />
              </View>
              <View style={styles.buttonWrapper}>
                <CButton title="검색" onPress={handleRegister} />
              </View>
            </View>
          </>
        ) : (
          <>
            {!playerData ? (
              <View style={[{flex: 1}, StyleSheet.absoluteFillObject]}>
                <ActivityIndicator size={48} color={colors.darkRed} />
              </View>
            ) : (
              <View style={styles.registerContainer}>
                {/* <View>
          <CText color={colors.white}>직업</CText>
          <CText color={colors.white}>{playerInfo.character_job_name}</CText>
          </View> */}
                <ResultItem
                  title={'직업'}
                  contents={playerData.character_job_name}
                />
                <ResultItem
                  title={'레벨'}
                  contents={playerData.character_level}
                />
                <ResultItem title={'서버'} contents={playerData.world_name} />
                <ResultItem
                  title={'이름'}
                  contents={playerData.character_name}
                />
                {/* <ResultItem
            title={'로그인'}
            contents={moment(playerInfo.character_date_last_login).format(
              'lll',
            )}
          />
          <ResultItem
            title={'로그아웃'}
            contents={moment(playerInfo.character_date_last_logout).format(
              'lll',
            )}
          /> */}
                <View style={styles.registerBtn}>
                  <CButton title="등록" onPress={handleRegisterCharacter} />
                </View>
              </View>
            )}
          </>
        )}
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  inputWrapper: {
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    // alignItems: 'center',
    padding: 15,
    gap: 10,
  },
  registerContainer: {flex: 1},
  result: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultContents: {
    backgroundColor: colors.inputBackground,
    color: colors.white,
    borderRadius: 10,
    fontSize: 18,
    padding: 15,
    paddingVertical: 15,
    margin: 10,
    flex: 1,
  },
  registerBtn: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  keyboardContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});
