import React, {useCallback} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../../components/common/Screen';
import {useQuery} from '@tanstack/react-query';
import {partyApi} from '../../api';
import CText from '../../components/common/CText';
import {colors, globalStyles} from '../../style';
import {useAtomValue} from 'jotai';
import {userAtom} from '../../store/user/atom';
import CButton from '../../components/common/CButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PartyList from '../../components/party/PartyList';
import {useTheme} from '../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';
import MyParty from '../../components/home/MyParty';
import PlayerItem from '../../components/player/PlayerItem';

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

interface Player {
  world_name: string;

  name: string;

  character_job: string;

  character_level: number;
}

interface IOnPress {
  (item: IParty): void;
}

const notice = [
  {
    label: 1,
  },
  {
    label: 2,
  },
];

const Home = ({
  navigation,
}: {
  route: any;
  navigation: NativeStackNavigationProp<any, 'Home'>;
}) => {
  const user = useAtomValue<{info: any; player: Player}>(userAtom);

  const theme = useTheme();

  const styles = createStyles(theme);

  const {data} = useQuery({
    queryKey: ['partyList'],
    queryFn: partyApi.getList,
    refetchInterval: 60000,
  });

  const {data: myParty} = useQuery({
    queryKey: ['myParty', user.player.id],
    queryFn: () => {
      return partyApi.myParty({player_id: user.player.id});
    },
    enabled: !!user.player.id,
  });

  const ListEmptyComponent = useCallback(() => {
    return (
      <>
        <View style={styles.characterContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.popTo('InRoute', {
                screen: 'MoreRoute',
                params: {screen: 'Manage', params: {needRegister: true}},
              })
            }
            style={styles.characterInfo}>
            {Object.keys(user?.player).length === 0 ? (
              <View style={[styles.flexRow, styles.gap10, styles.needRegister]}>
                {/* <Image
                  source={require('../../assets/kkk.jpg')}
                  style={styles.avatar}
                /> */}
                <Icon
                  name="person-circle-outline"
                  color={theme.text}
                  size={36}
                />
                <View style={styles.gap5}>
                  {/* <View style={[styles.flexRow]}>
                    <CText size={16} color={theme.gray}>
                      {user?.player?.world_name}
                    </CText>
                    <CText size={16} color={theme.gray}>
                      {user?.player?.character_job}
                    </CText>
                    <CText size={16} color={theme.gray}>
                      {user?.player?.character_level}
                    </CText>
                  </View> */}
                  <CText color={theme.text}>
                    {/* {user?.player?.name} */}
                    캐릭터 등록이 필요합니다.
                  </CText>
                </View>
              </View>
            ) : (
              <PlayerItem user={user?.player} />
            )}
          </TouchableOpacity>
        </View>
        {/* <FlatList
          data={notice}
          renderItem={noticeRenderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.noticeContainer}
        /> */}
        {myParty && myParty?.list?.length ? (
          <>
            <View style={styles.listContainer}>
              <CText size={14} color={theme.gray}>
                가입되어 있는 파티
              </CText>
              <MyParty data={myParty?.list?.[0]} />
            </View>
            <View style={styles.pv20} />
          </>
        ) : undefined}
        <View style={styles.listContainer}>
          <View style={[styles.flexRow, styles.between]}>
            <CText size={14} color={theme.gray}>
              파티 목록
            </CText>
            <CButton
              title="더보기"
              onPress={() =>
                navigation.navigate('InRoute', {screen: 'PartyRoute'})
              }
            />
          </View>
          <PartyList
            data={data?.list.filter((v: IParty, i: number) => i < 3)}
          />
        </View>
      </>
    );
  }, [data?.list, user?.player, , theme, styles, navigation, myParty]);

  return (
    // <Screen name="Memple">
    <FlatList
      data={null}
      renderItem={null}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.container}
    />
    // </Screen>
  );
};

export default Home;

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
