import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import CText from '../common/CText';
import {useAtomValue} from 'jotai';
import {userAtom} from '../../store/user/atom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import PartyItem from '../party/PartyItem';

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

const MyParty = ({data}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <PartyItem item={data} />
    </View>
  );
};

export default MyParty;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      paddingTop: 15,
      gap: 10,
    },
  });
};
