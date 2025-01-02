import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import Screen from '../../../components/common/Screen';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {playerApi} from '../../../api';
import {colors, flexRow, globalStyles} from '../../../style';
import CText from '../../../components/common/CText';
import CButton from '../../../components/common/CButton';
import {useSetAtom} from 'jotai';
import {userAtom} from '../../../store/user/atom';
import {setStorage} from '../../../store/asyncStorage';

const Manage = () => {
  const setUser = useSetAtom(userAtom);
  const queryClient = useQueryClient();
  const {data, isLoading} = useQuery({
    queryKey: ['myPlayers'],
    queryFn: playerApi.myPlayers,
  });

  const handleSelect = async (id, ocid, data) => {
    console.log('select', data);
    const res = await playerApi.select({id});

    console.log('res', res);

    if (res.success) {
      queryClient.invalidateQueries('myPlayers');

      setUser(prev => ({
        ...prev,
        player: data,
      }));
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.item}>
          <View style={globalStyles.flexRow}>
            <CText color={colors.white}>{item.name}</CText>
            <CText color={colors.gray}>{item.character_job}</CText>
            <CText color={colors.gray}>{item.character_level}</CText>
          </View>
          <CButton
            title={item.status ? '선택 해제' : '선택'}
            onPress={() => handleSelect(item.id, item.ocid, item)}
          />
        </View>
      </>
    );
  };

  return (
    <Screen name="캐릭터 관리" back>
      {isLoading ? (
        <View style={StyleSheet.absoluteFillObject}>
          <ActivityIndicator size={24} color={colors.darkRed} />
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

const styles = StyleSheet.create({
  item: {
    padding: 10,
    gap: 10,
    // paddingVertical: 20,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    gap: 10,
  },
});
