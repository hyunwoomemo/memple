import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
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

  const renderItem = ({item}) => {
    return (
      <>
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
      </>
    );
  };

  return (
    <Screen name="캐릭터 관리" back>
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
          renderItem={renderItem}
        />
      )}
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
