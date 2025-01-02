import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Screen from '../../components/common/Screen';
import CText from '../../components/common/CText';
import {colors} from '../../style';
import {removeStorage} from '../../store/asyncStorage';
import {useSetAtom} from 'jotai';
import {userAtom} from '../../store/user/atom';

const ListTitle = ({children}: {children: React.ReactNode}) => {
  return (
    <View style={styles.title}>
      <CText bold size={24} color={colors.gray}>
        {children}
      </CText>
    </View>
  );
};

const ListItem = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <CText size={18} color={colors.white}>
        {children}
      </CText>
    </TouchableOpacity>
  );
};

const More = ({navigation}) => {
  const setUser = useSetAtom(userAtom);

  const handleLogout = () => {
    removeStorage('token');
    removeStorage('refreshToken');
    removeStorage('userId');
    setUser({info: {}, player: {}});
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <ListTitle>캐릭터</ListTitle>
          <ListItem onPress={() => navigation.push('Register')}>
            캐릭터 등록
          </ListItem>
          <ListItem onPress={() => navigation.push('Manage')}>
            캐릭터 관리
          </ListItem>
        </View>
        <View style={styles.itemContainer}>
          <ListTitle>유저</ListTitle>
          <ListItem onPress={handleLogout}>로그아웃</ListItem>
        </View>
      </View>
    </Screen>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
  },
  itemContainer: {
    gap: 10,
    paddingVertical: 20,
  },
  title: {
    // padding: 10,
    paddingBottom: 15,
  },
  item: {
    // padding: 20,
    padding: 5,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.gray,
  },
});
