import React, {useCallback} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../../components/common/Screen';
import {useQuery} from '@tanstack/react-query';
import {partyApi} from '../../api';
import CText from '../../components/common/CText';
import {colors} from '../../style';
import {useAtomValue} from 'jotai';
import {userAtom} from '../../store/user/atom';

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

const Home = ({route, navigation}) => {
  const user = useAtomValue(userAtom);

  const {data} = useQuery({
    queryKey: ['partyList'],
    queryFn: partyApi.getList,
  });

  console.log('user', user);

  const onPress = useCallback(
    item => {
      if (user.player && Object.keys(user.player).length > 0) {
        navigation.navigate('PartyDetailRoute', {
          // screen: 'PartyDetailRoute',
          item,
        });
      } else {
        Alert.alert('캐릭터를 등록해주세요');
      }
    },
    [user?.player],
  );

  const renderItem = useCallback(
    ({item}: {item: IParty}) => {
      return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.item}>
          <View>
            <CText bold color={colors.lightRed}>
              {item.region}
            </CText>
            <View style={styles.divider} />
            <CText color={colors.white}>{item.title}</CText>
            <View style={styles.divider} />
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexRow}>
              <View style={styles.exp}>
                <CText size={13} color={colors.white}>
                  exp
                </CText>
                <CText size={13} color={colors.lightRed}>
                  {item.exp_condition ? `${item.exp_condition} ↑` : '무관'}
                </CText>
              </View>
              {/* <CText color={colors.white}>{item.exp_condition}</CText> */}
            </View>
            <View style={styles.flexRow}>
              <View style={styles.level}>
                <CText size={13} color={colors.white}>
                  level
                </CText>
                <CText size={13} color={colors.lightRed}>
                  {item.level_condition ? `${item.level_condition} ↑` : '무관'}
                </CText>
              </View>
              {/* <CText color={colors.white}>{item.level_condition}</CText> */}
            </View>
            <View style={styles.playerCount}>
              <CText color={colors.white} bold>
                {item.player_count}명
              </CText>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [onPress],
  );

  return (
    <Screen name="파티 목록">
      <CText color={colors.white}>{user?.player?.name}</CText>
      <View style={styles.container}>
        {/* <CText bold size={24} color={colors.gray}>
          가입한 파티
        </CText> */}
        <FlatList
          contentContainerStyle={styles.list}
          data={data?.list}
          renderItem={renderItem}
        />
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  list: {
    paddingVertical: 20,
    gap: 10,
  },
  item: {
    padding: 10,
    gap: 10,
    // paddingVertical: 20,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  exp: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: colors.darkNavy,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  level: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: colors.darkNavy,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  divider: {
    paddingVertical: 3,
  },
  playerCount: {
    marginLeft: 'auto',
  },
});
