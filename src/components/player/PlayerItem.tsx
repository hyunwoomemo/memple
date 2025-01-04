import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import CText from '../common/CText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';

const PlayerItem = ({user, settings = true}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <>
      <Image source={require('../../assets/kkk.jpg')} style={styles.avatar} />
      <View style={styles.gap5}>
        <View style={[styles.flexRow]}>
          <CText size={14} color={theme.gray}>
            {user?.world_name}
          </CText>
          <CText size={14} color={theme.gray}>
            {user?.character_job}
          </CText>
          <CText size={14} color={theme.gray}>
            {user?.character_level}
          </CText>
        </View>
        <CText size={20} color={theme.text}>
          {user?.name}
        </CText>
      </View>
      <View style={{marginLeft: 'auto'}}>
        {settings && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.popTo('InRoute', {
                screen: 'MoreRoute',
                params: {
                  screen: 'Manage',
                  params: {needRegister: true},
                },
              })
            }>
            <Icon name="settings-outline" size={20} color={theme.text} />
            {/* <Image
        source={require('../../assets/settings.png')}
        style={{width: 24, height: 24}}
      /> */}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default PlayerItem;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      // flex: 1,
      // paddingVertical: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
      // padding: 10,
    },
    pv20: {
      paddingVertical: 20,
    },
    characterContainer: {
      padding: 10,
      // backgroundColor: theme.backgroundDarker,
      borderRadius: 10,
      // margin: 10,
      paddingVertical: 30,
    },
    characterInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    button: {
      backgroundColor: theme.backgroundDarker,
      padding: 15,
      borderRadius: 15,
    },
    listContainer: {
      // backgroundColor: theme.backgroundDarker,
      padding: 10,
    },
    flexRow: {
      flexDirection: 'row',
      gap: 3,
      alignItems: 'center',
    },

    noticeContainer: {
      paddingHorizontal: 10,
    },
    noticeItem: {
      padding: 10,
      backgroundColor: theme.backgroundDarker,
      borderRadius: 10,
      minWidth: 200,
      height: 100,
      margin: 5,
    },
    gap5: {
      gap: 5,
    },
    gap10: {
      gap: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: '50%',
      resizeMode: 'cover',
    },
    needRegister: {
      backgroundColor: theme.backgroundDarker,
      padding: 10,
      borderRadius: 10,
      flex: 1,
      // margin: 10,
    },
    between: {
      justifyContent: 'space-between',
    },
  });
};
