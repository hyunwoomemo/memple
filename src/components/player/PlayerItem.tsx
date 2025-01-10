import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import CText from '../common/CText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';
import moment from 'moment';
import {useSocket} from '../../hooks/useSocket';
import {useAtomValue} from 'jotai';
import {userAtom} from '../../store/user/atom';
import FastImage from 'react-native-fast-image';

const PlayerItem = ({data, settings = true, party, partyId, creator}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [elapsedTime, setElapsedTime] = useState('');
  const {socket} = useSocket();
  const user = useAtomValue(userAtom);

  const theme = useTheme();

  const styles = createStyles(theme);

  useEffect(() => {
    if (data?.status !== 0 || !data?.updated_at) {
      return setElapsedTime('');
    }

    const interval = setInterval(() => {
      const duration = moment.duration(moment().diff(moment(data.updated_at)));
      const hours = String(duration.hours()).padStart(2, '0');
      const minutes = String(duration.minutes()).padStart(2, '0');
      const seconds = String(duration.seconds()).padStart(2, '0');
      setElapsedTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const handleOut = () => {
    socket.emit('updateStatusParty', {
      player_id: user.player.id,
      party_id: partyId,
      status: -1,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        flex: 1,
        alignItems: 'center',
      }}>
      {data?.character_job && (
        <FastImage
          source={{uri: `http://15.164.212.90:8000/${data?.image_url}`}}
          style={styles.avatar}
          resizeMode="cover"
        />
      )}
      <View style={styles.gap5}>
        <View style={[styles.flexRow]}>
          <CText size={14} color={theme.gray}>
            {data?.world_name}
          </CText>
          <CText size={14} color={theme.gray}>
            {data?.character_job}
          </CText>
          <CText size={14} color={theme.gray}>
            {data?.character_level}
          </CText>
        </View>
        <View style={styles.nameContainer}>
          {creator && <Icon name="flame-outline" color={'tomato'} size={20} />}
          <CText size={20} color={theme.text}>
            {data?.name}
          </CText>
        </View>
      </View>
      <View style={{marginLeft: 'auto'}}>
        {settings && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.push('Manage', {
                needRegister: true,
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
      {elapsedTime && <CText color={theme.text}>{elapsedTime}</CText>}
      {party && (
        <TouchableOpacity onPress={handleOut} style={styles.flexRow}>
          <Icon color={theme.text} name="exit-outline" size={24} />
          {/* <CButton title="탈퇴" /> */}
        </TouchableOpacity>
      )}
    </View>
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
    nameContainer: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
  });
};
