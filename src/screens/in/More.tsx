import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Screen from '../../components/common/Screen';
import CText from '../../components/common/CText';
import {colors, globalStyles} from '../../style';
import {getStorage, removeStorage, setStorage} from '../../store/asyncStorage';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {userAtom} from '../../store/user/atom';
import CustomSwitch from '../../components/common/CustomSwitch';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {appAtom, getThemeAtom} from '../../store/app/atom';
import {useTheme} from '../../hooks/useTheme';

const ListTitle = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: any;
}) => {
  return (
    <View style={styles.title}>
      <CText bold size={24} color={theme.gray}>
        {children}
      </CText>
    </View>
  );
};

const ListItem = ({
  children,
  onPress,
  theme,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  theme: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <CText size={18} color={theme.text}>
        {children}
      </CText>
    </TouchableOpacity>
  );
};

const More = ({navigation}) => {
  const setUser = useSetAtom(userAtom);

  const [app, setApp] = useAtom(appAtom);

  const theme = useTheme();

  const handleLogout = () => {
    removeStorage('token');
    removeStorage('refresh_token');
    removeStorage('userId');
    setUser({info: {}, player: {}});
  };

  const handleTheme = () => {
    setApp(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
    setStorage('theme', app.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Screen>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.itemContainer}>
          <ListTitle theme={theme}>캐릭터</ListTitle>
          <ListItem theme={theme} onPress={() => navigation.push('Register')}>
            캐릭터 등록
          </ListItem>
          <ListItem theme={theme} onPress={() => navigation.push('Manage')}>
            캐릭터 관리
          </ListItem>
        </View>
        <View style={styles.itemContainer}>
          <ListTitle theme={theme}>유저</ListTitle>
          <ListItem theme={theme} onPress={handleLogout}>
            로그아웃
          </ListItem>
        </View>
        <View style={styles.itemContainer}>
          <ListTitle theme={theme}>설정</ListTitle>
          <View
            style={[globalStyles.flexRow, globalStyles.justifySpaceBetween]}>
            <ListItem theme={theme}>다크모드</ListItem>
            <CustomSwitch on={app.theme === 'dark'} onPress={handleTheme} />
          </View>
        </View>
      </GestureHandlerRootView>
    </Screen>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    padding: 10,
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
    // borderBottomColor: colors.dark.gray,
  },
});
