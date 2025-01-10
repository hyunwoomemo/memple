import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import Screen from '../../../components/common/Screen';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {playerApi} from '../../../api';
import {colors, flexRow, globalStyles} from '../../../style';
import CText from '../../../components/common/CText';
import {useSetAtom} from 'jotai';
import {userAtom} from '../../../store/user/atom';

import {useTheme} from '../../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';
import PlayerItem from '../../../components/player/PlayerItem';
import {useSocket} from '../../../hooks/useSocket';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import IconButton from '../../../components/common/IconButton';
import SwipeableItem, {
  SwipeableCard,
} from '../../../components/common/SwipeableItem';

const Manage = ({route, navigation}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const setUser = useSetAtom(userAtom);
  const queryClient = useQueryClient();
  const {data, isLoading} = useQuery({
    queryKey: ['myPlayers'],
    queryFn: playerApi.myPlayers,
  });

  const {socket} = useSocket();

  const handleSelect = async (id, ocid, data) => {
    const res = await playerApi.select({id});

    if (res.success) {
      setUser(prev => ({
        ...prev,
        player: data,
      }));
      // queryClient.invalidateQueries(['myParty']);
      // queryClient.invalidateQueries(['partyList']);
      queryClient.invalidateQueries(['myPlayers']);

      socket?.disconnect();

      if (route?.params?.needRegister) {
        navigation.goBack();
      }
    }
  };

  const renderItem = ({item, handleSwipeStart}) => {
    return (
      <SwipeableItem
        handleSwipeStart={handleSwipeStart}
        id={item.id}
        refreshMyPlayers={refreshMyPlayers}>
        <TouchableOpacity
          onPress={() => handleSelect(item.id, item.ocid, item)}
          style={styles.item}>
          <PlayerItem data={item} settings={false} />
          {item.status ? (
            <Icon
              name={'checkmark-circle-outline'}
              size={24}
              color={theme.primary}
            />
          ) : undefined}
        </TouchableOpacity>
      </SwipeableItem>
    );
  };

  const refreshMyPlayers = () => {
    console.log('refreshMyPlayersrefreshMyPlayers');
    queryClient.invalidateQueries(['myPlayers']);
  };

  const Side = () => {
    return <IconButton name={'add-circle-outline'} />;
  };

  const swipeableRef = useRef<{
    current: any;
    id: string | null;
  }>({current: null, id: null});

  const handleSwipeStart = (id: string, ref) => {
    // 현재 열린 항목이 있다면 닫기
    if (swipeableRef.current.current && swipeableRef.current.id !== id) {
      swipeableRef.current.current.close();
    }
    // 현재 스와이프된 항목 업데이트
    swipeableRef.current = {current: ref, id};
  };

  return (
    <Screen name="캐릭터 관리" back side={() => Side()}>
      {/* <GestureHandlerRootView> */}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={theme.primary} />
        </View>
      ) : data.list.length === 0 ? (
        <View>
          <CText>데이터가 없습니다.</CText>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={data.list}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderItem({item, handleSwipeStart})}
        />
      )}
      {/* </GestureHandlerRootView> */}
    </Screen>
  );
};

export default Manage;

const createStyles = theme => {
  return StyleSheet.create({
    item: {
      padding: 15,
      gap: 10,
      // paddingVertical: 20,
      backgroundColor: theme.backgroundDarker,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    list: {
      gap: 10,
      padding: 10,
    },
  });
};
