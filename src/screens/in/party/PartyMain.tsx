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

moment.locale('ko'); // 로케일을 한글로 설정합니다.
const PartyMain = ({
  item,
}: {
  item: {id: number; title: string; description: string};
}) => {
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
            <CText size={14} color={colors.gray}>
              EXP
            </CText>
            <CText bold color={colors.white}>
              95
            </CText>
          </View>
          <View style={styles.infoItem}>
            <CText size={14} color={colors.gray}>
              LEV
            </CText>
            <CText bold color={colors.white}>
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
                      <CText color={colors.white}>{v.name}</CText>
                      <CText color={colors.gray}>{v.character_job}</CText>
                      <CText color={colors.gray}>Lv.{v.character_level}</CText>
                      {/* <CText color={colors.primary}>{v.exp}</CText> */}
                    </View>
                    <View style={styles.flexRow}>
                      <CText size={14} color={colors.lightGreen}>
                        혈반
                      </CText>
                      <CText size={14} color={colors.lightGreen}>
                        룬
                      </CText>
                      <CText size={14} color={colors.darkGray}>
                        자석펫
                      </CText>
                    </View>
                  </View>
                );
              })}
              {/* <View style={styles.flexRow}>
                <CText color={colors.white}>♚</CText>
                <CText color={colors.gray}>팬텀</CText>
                <CText color={colors.white}>이쟌</CText>
                <CText color={colors.white}>Lv.244</CText>
                <CText color={colors.primary}>115</CText>
              </View> */}
            </View>
          </View>
          {/* <View style={styles.player}>
            <View style={styles.flexRow}>
              <CText color={colors.gray}>블래스터</CText>
              <CText color={colors.white}>블래</CText>
              <CText color={colors.white}>Lv.247</CText>
              <CText color={colors.primary}>121</CText>
            </View>
            <View style={styles.flexRow}>
              <CText size={14} color={colors.lightGreen}>
                혈반
              </CText>
              <CText size={14} color={colors.darkGray}>
                룬
              </CText>
              <CText size={14} color={colors.lightGreen}>
                자석펫
              </CText>
            </View>
          </View>
          <View style={styles.player}>
            <View style={styles.flexRow}>
              <CText color={colors.gray}>소울마스터</CText>
              <CText color={colors.white}>인플루언서</CText>
              <CText color={colors.white}>Lv.241</CText>
              <CText color={colors.primary}>117</CText>
            </View>
            <View style={styles.flexRow}>
              <CText size={14} color={colors.lightGreen}>
                혈반
              </CText>
              <CText size={14} color={colors.darkGray}>
                룬
              </CText>
              <CText size={14} color={colors.darkGray}>
                자석펫
              </CText>
            </View>
          </View> */}
        </View>
        <ScrollView contentContainerStyle={styles.notice}>
          <CText color={colors.white}>공지사항</CText>
          <View>{item.description}</View>
        </ScrollView>
      </View>
      <View style={{marginVertical: 15}}>
        <CButton title={renderUdateStatusText} onPress={onPress} />
      </View>
    </>
  );
};

export default PartyMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
  },
  notice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    // backgroundColor: colors.inputBackground,
    borderRadius: 10,
    minHeight: '200%',
  },
  players: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 5,
    gap: 10,
    // backgroundC olor: colors.inputBackground,
    borderRadius: 10,
  },
  player: {
    flexDirection: 'row',
    width: '100%',
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 5,
    // marginVertical: 5,
    // backgroundColor: colors.inputBackground,
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,
    paddingVertical: 10,
    gap: 10,
    marginVertical: 5,
    // backgroundColor: colors.inputBackground,
    borderRadius: 10,
  },
  infoItem: {
    gap: 5,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    borderRadius: 10,
  },
});
