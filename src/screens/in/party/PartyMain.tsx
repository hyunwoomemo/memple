import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSocket} from '../../../hooks/useSocket';
import Screen from '../../../components/common/Screen';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../../style';
import CText from '../../../components/common/CText';
import {useQuery} from '@tanstack/react-query';
import {partyApi} from '../../../api';
import CButton from '../../../components/common/CButton';
import moment from 'moment';
import 'moment/locale/ko'; // 한글 로케일을 불러옵니다.
import {useAtom, useAtomValue} from 'jotai';
import {userAtom} from '../../../store/user/atom';
import {useTheme} from '../../../hooks/useTheme';

moment.locale('ko'); // 로케일을 한글로 설정합니다.
const PartyMain = ({
  item,
}: {
  item: {id: number; title: string; description: string};
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [elapsedTime, setElapsedTime] = useState('');
  const user = useAtomValue(userAtom);
  const {socket} = useSocket();
  const {id, title} = item;

  const {data, isFetched} = useQuery({
    queryKey: ['getPartyPlayer'],
    queryFn: () => partyApi.getPartyPlayer({party_id: id}),
  });

  console.log('itemitemitem', data);
  const isMember = useMemo(
    () =>
      isFetched &&
      data.list &&
      data.list.find((v: any) => v.player_id === user.player.id),
    [data],
  );

  const myData = useMemo(
    () =>
      isFetched &&
      data.list &&
      data.list.find((v: any) => v.player_id === user.player.id),
    [data],
  );

  useEffect(() => {
    if (!socket || !id) {
      return;
    }

    socket.emit('enterParty', {player_id: user.player.id, party_id: id});
  }, [socket, id]);

  const onPress = useCallback(() => {
    if (!socket || !id) {
      return;
    }

    const status = myData ? (myData.status === 1 ? 0 : 1) : 1;

    console.log('user.player.id,', user.player.id, id, status);

    socket.emit('updateStatusParty', {
      player_id: user.player.id,
      party_id: id,
      status,
    });
  }, [socket, id, myData]);

  const renderUdateStatusText = useMemo(() => {
    if (!isMember) {
      return '파티 가입';
    }

    if (myData?.status === 1) {
      return '외출';
    }

    if (myData?.status === 0) {
      return '복귀';
    }

    return '외출';
  }, [myData, isMember]);

  useEffect(() => {
    if (myData?.status !== 0 || !myData?.updated_at) {
      return setElapsedTime('');
    }

    const interval = setInterval(() => {
      const duration = moment.duration(
        moment().diff(moment(myData.updated_at)),
      );
      const hours = String(duration.hours()).padStart(2, '0');
      const minutes = String(duration.minutes()).padStart(2, '0');
      const seconds = String(duration.seconds()).padStart(2, '0');
      setElapsedTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [myData]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <CText size={14} color={theme.gray}>
              EXP
            </CText>
            <CText bold color={theme.text}>
              95
            </CText>
          </View>
          <View style={styles.infoItem}>
            <CText size={14} color={theme.gray}>
              LEV
            </CText>
            <CText bold color={theme.text}>
              220
            </CText>
          </View>
        </View>

        <View style={styles.players}>
          <View style={styles.player}>
            <View style={styles.gap5}>
              {data?.list.map(v => {
                return (
                  <View key={v.ocid} style={styles.player}>
                    <View style={styles.flexRow}>
                      <CText color={theme.text}>{v.name}</CText>
                      <CText color={theme.gray}>{v.character_job}</CText>
                      <CText color={theme.gray}>Lv.{v.character_level}</CText>
                      {/* <CText color={theme.primary}>{v.exp}</CText> */}
                    </View>
                    <View style={styles.flexRow}>
                      <CText size={14} color={theme.lightGreen}>
                        혈반
                      </CText>
                      <CText size={14} color={theme.lightGreen}>
                        룬
                      </CText>
                      <CText size={14} color={theme.darkGray}>
                        자석펫
                      </CText>
                    </View>
                  </View>
                );
              })}
              {/* <View style={styles.flexRow}>
                <CText color={theme.text}>♚</CText>
                <CText color={theme.gray}>팬텀</CText>
                <CText color={theme.text}>이쟌</CText>
                <CText color={theme.text}>Lv.244</CText>
                <CText color={theme.primary}>115</CText>
              </View> */}
            </View>
          </View>
          {/* <View style={styles.player}>
            <View style={styles.flexRow}>
              <CText color={theme.gray}>블래스터</CText>
              <CText color={theme.text}>블래</CText>
              <CText color={theme.text}>Lv.247</CText>
              <CText color={theme.primary}>121</CText>
            </View>
            <View style={styles.flexRow}>
              <CText size={14} color={theme.lightGreen}>
                혈반
              </CText>
              <CText size={14} color={theme.darkGray}>
                룬
              </CText>
              <CText size={14} color={theme.lightGreen}>
                자석펫
              </CText>
            </View>
          </View>
          <View style={styles.player}>
            <View style={styles.flexRow}>
              <CText color={theme.gray}>소울마스터</CText>
              <CText color={theme.text}>인플루언서</CText>
              <CText color={theme.text}>Lv.241</CText>
              <CText color={theme.primary}>117</CText>
            </View>
            <View style={styles.flexRow}>
              <CText size={14} color={theme.lightGreen}>
                혈반
              </CText>
              <CText size={14} color={theme.darkGray}>
                룬
              </CText>
              <CText size={14} color={theme.darkGray}>
                자석펫
              </CText>
            </View>
          </View> */}
        </View>
        <ScrollView contentContainerStyle={styles.notice}>
          <CText color={theme.text}>공지사항</CText>
          <View>{item.description}</View>
        </ScrollView>
      </View>
      <View style={{margin: 15}}>
        <CButton title={renderUdateStatusText} onPress={onPress} />
      </View>
    </>
  );
};

export default PartyMain;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    notice: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      marginVertical: 5,
      borderRadius: 10,
      minHeight: '200%',
    },
    players: {
      paddingVertical: 15,
      marginVertical: 5,
      gap: 10,
      borderRadius: 10,
    },
    player: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      padding: 5,
      borderRadius: 10,
    },
    flexRow: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    gap5: {
      gap: 5,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      gap: 10,
      marginVertical: 5,
      borderRadius: 10,
    },
    infoItem: {
      gap: 5,
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor: theme.backgroundDarker,
      alignItems: 'center',
      borderRadius: 10,
    },
  });
};
