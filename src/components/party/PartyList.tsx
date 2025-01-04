import {useAtomValue} from 'jotai';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {userAtom} from '../../store/user/atom';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Alert} from 'react-native';
import CText from '../common/CText';
import {colors} from '../../style';
import {useTheme} from '../../hooks/useTheme';
import PartyItem from './PartyItem';

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

interface PartyListProps {
  data: IParty[];
}

const PartyList: React.FC<PartyListProps> = ({data}) => {
  const theme = useTheme();

  const styles = createStyles(theme);

  const renderItem = useCallback(({item}: {item: IParty}) => {
    return <PartyItem item={item} />;
  }, []);

  return <FlatList style={styles.list} data={data} renderItem={renderItem} />;
};

export default PartyList;

const createStyles = theme => {
  return StyleSheet.create({
    list: {
      paddingTop: 15,
      gap: 10,
    },
  });
};
