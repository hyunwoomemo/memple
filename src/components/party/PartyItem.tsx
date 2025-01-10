import {useAtomValue} from 'jotai';
import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {userAtom} from '../../store/user/atom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../hooks/useTheme';
import CText from '../common/CText';
import Svg, {Defs, Rect, LinearGradient, Stop} from 'react-native-svg';

interface IParty {
  channel: number;
  created_at: string;
  creator_id: string;
  description: string | null;
  exp_condition: number;
  id: number;
  level_condition: number;
  password: number;
  region: string;
  server: string;
  title: string;
  player_count: number;
}

const PartyItem = ({item, my}) => {
  const user = useAtomValue(userAtom);
  const navigation = useNavigation<NavigationProp<any>>();
  const theme = useTheme();

  const FROM_COLOR = theme.primary;
  const TO_COLOR = 'rgb(119, 168, 160)27)';

  const styles = createStyles(theme, my);
  const onPress = useCallback(
    (item: IParty) => {
      if (user.player && Object.keys(user.player).length > 0) {
        navigation.navigate('PartyDetailRoute', {
          item,
        });
      } else {
        Alert.alert('캐릭터를 등록해주세요');
      }
    },
    [user?.player, navigation],
  );

  if (!item) {
    return;
  }

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

  if (my) {
    return (
      <View
        style={{
          borderRadius: 10, // 둥근 모서리 적용
          overflow: 'hidden', // 둥근 모서리를 View가 유지하도록 추가
        }}>
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
          <Defs>
            <LinearGradient id="grad" x1="30%" y1="20%" x2="80%" y2="100%">
              <Stop offset="0" stopColor={FROM_COLOR} />
              <Stop offset="1" stopColor={TO_COLOR} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
        <TouchableOpacity onPress={() => onPress(item)} style={styles.item}>
          <View>
            <CText color={my ? theme.white : theme.gray}>{item.region}</CText>
            <View style={styles.divider} />
            <CText
              color={my ? theme.white : theme.text}
              bold={my ? true : false}>
              {item.title}
            </CText>
            <View style={styles.divider} />
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexRow}>
              <View style={styles.exp}>
                <CText size={13} color={theme.gray}>
                  exp
                </CText>
                <CText size={13} color={theme.text}>
                  {item.exp_condition ? `${item.exp_condition} ↑` : '무관'}
                </CText>
              </View>
            </View>
            <View style={styles.flexRow}>
              <View style={styles.level}>
                <CText size={13} color={theme.gray}>
                  level
                </CText>
                <CText size={13} color={theme.text}>
                  {levelCondition(item.min_level, item.max_level)
                    ? levelCondition(item.min_level, item.max_level)
                    : '무관'}
                </CText>
              </View>
            </View>
            <View style={styles.playerCount}>
              <CText size={14} color={my ? theme.white : theme.text}>
                {item.player_count} / 6
              </CText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.item}>
      <View>
        <CText color={my ? theme.white : theme.gray}>{item.region}</CText>
        <View style={styles.divider} />
        <CText color={my ? theme.white : theme.text} bold={my ? true : false}>
          {item.title}
        </CText>
        <View style={styles.divider} />
      </View>
      <View style={styles.flexRow}>
        <View style={styles.flexRow}>
          <View style={styles.exp}>
            <CText size={13} color={theme.gray}>
              exp
            </CText>
            <CText size={13} color={theme.text}>
              {item.exp_condition ? `${item.exp_condition} ↑` : '무관'}
            </CText>
          </View>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.level}>
            <CText size={13} color={theme.gray}>
              level
            </CText>
            <CText size={13} color={theme.text}>
              {levelCondition(item.min_level, item.max_level)
                ? levelCondition(item.min_level, item.max_level)
                : '무관'}
            </CText>
          </View>
        </View>
        <View style={styles.playerCount}>
          <CText size={14} color={my ? theme.white : theme.text}>
            {item.player_count} / 6
          </CText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PartyItem;

const createStyles = (theme, my) => {
  return StyleSheet.create({
    item: {
      padding: 10,
      gap: 10,
      // paddingVertical: 20,
      backgroundColor: my ? undefined : theme.backgroundDarker,
      borderRadius: 10,
      // shadowColor: theme.text,
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.2,
      // shadowRadius: 1.41,

      // elevation: 3,
    },
    divider: {
      paddingVertical: 3,
    },
    flexRow: {
      flexDirection: 'row',
      gap: 7,
      alignItems: 'center',
    },
    exp: {
      flexDirection: 'row',
      gap: 5,
      backgroundColor: theme.background,
      padding: 2,
      paddingHorizontal: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    level: {
      flexDirection: 'row',
      gap: 5,
      backgroundColor: theme.background,
      padding: 2,
      paddingHorizontal: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    playerCount: {
      marginLeft: 'auto',
    },
    itemContainer: {
      width: 40,
      height: 40,
      borderRadius: 5,
      backgroundColor: theme.backgroundDarker,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
