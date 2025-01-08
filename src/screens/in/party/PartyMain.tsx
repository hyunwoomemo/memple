import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSocket} from '../../../hooks/useSocket';
import {colors, globalStyles} from '../../../style';
import CText from '../../../components/common/CText';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {partyApi} from '../../../api';
import CButton from '../../../components/common/CButton';
import moment from 'moment';
import 'moment/locale/ko'; // 한글 로케일을 불러옵니다.
import {useAtom, useAtomValue} from 'jotai';
import {userAtom} from '../../../store/user/atom';
import {useTheme} from '../../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';
import PlayerItem from '../../../components/player/PlayerItem';
import {appAtom} from '../../../store/app/atom';

moment.locale('ko'); // 로케일을 한글로 설정합니다.
const PartyMain = ({
  item,
}: {
  item: {id: number; title: string; description: string};
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const user = useAtomValue(userAtom);
  const {socket} = useSocket();
  const {id, title} = item;

  const {data, isFetched} = useQuery({
    queryKey: ['getPartyPlayer', id],
    queryFn: () => partyApi.getPartyPlayer({party_id: id}),
    enabled: !!id,
  });

  // const {data: parties, isRefetching} = useQuery({
  //   queryKey: ['partyList'],
  //   queryFn: partyApi.getList,
  // });

  //
  //   'partyListpartyList',
  //   isRefetching,
  //   parties?.list?.[0]?.player_count,
  // );

  const myData = useMemo(
    () =>
      isFetched &&
      data.list &&
      data.list.find((v: any) => v.player_id === user.player.id),
    [data],
  );
  const isMember = useMemo(() => myData?.status > -1, [myData]);

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
      prevStatus: myData?.status,
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

  const TagItem = useCallback(
    ({type, data}) => {
      return (
        <View style={styles.tag}>
          <CText color={theme.text}>{type}</CText>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <CText color={theme.text}>{data}</CText>
            {type === 'EXP' && (
              <Icon size={16} name="arrow-up" color={theme.primary} />
            )}
          </View>
        </View>
      );
    },
    [theme, styles],
  );

  const Item = useCallback(({title, children}) => {
    return (
      <>
        <View style={{paddingVertical: 20, paddingTop: 30}}>
          <CText color={theme.gray}>{title}</CText>
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 15,
            gap: 40,
          }}>
          {children}
        </View>
      </>
    );
  }, []);

  const levelCondition = useCallback((min, max) => {
    if (min && max) {
      return `${min} ~ ${max}`;
    }

    if (min && !max) {
      return `${min} ~`;
    }

    if (!min && max) {
      return `~ ${max}`;
    }

    return;
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <CText size={20}>{item.region}</CText> */}
        {/* <View style={styles.title}>
          <CText>정보</CText>
        </View> */}
        <View style={styles.info}>
          <CText color={theme.text} bold size={16}>
            {item.region}
          </CText>
        </View>
        <View style={styles.tagContainer}>
          <View style={globalStyles.flexRow}>
            <TagItem type={'EXP'} data={item.exp_condition} />
          </View>
          {levelCondition(item.min_level, item.max_level) && (
            <TagItem
              type={'LEVEL'}
              data={`${levelCondition(item.min_level, item.max_level)}`}
            />
          )}
        </View>
        {data?.list?.length > 0 && (
          <Item title={'파티원'}>
            {data?.list.map(item => (
              <PlayerItem
                key={item.player_id}
                data={item}
                settings={false}
                party={user.player.id === item.player_id}
                partyId={id}
              />
            ))}
          </Item>
        )}
        {item.description && (
          <Item title={'소개글'}>
            <CText color={theme.text}>{item.description}</CText>
          </Item>
        )}
      </ScrollView>
      <View style={{margin: 15}}>
        <CButton primary title={renderUdateStatusText} onPress={onPress} />
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
      // backgroundColor: theme.backgroundDarker,
      paddingTop: 15,
    },
    info: {
      backgroundColor: theme.background,
      padding: 10,
      borderRadius: 15,
    },
    title: {
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    tagContainer: {
      flexDirection: 'row',
      // backgroundColor: theme.backgroundDarker,
      gap: 10,
      paddingVertical: 10,
    },
    tag: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundDarker,
      padding: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      gap: 10,
    },
  });
};
