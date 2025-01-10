import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useQuery} from '@tanstack/react-query';

import {useAtom, useAtomValue} from 'jotai';
import {colors, globalStyles} from '../../../style';
import CText from '../../../components/common/CText';
import {userAtom} from '../../../store/user/atom';
import {partyApi} from '../../../api';
import Screen from '../../../components/common/Screen';
import PartyList from '../../../components/party/PartyList';
import {useTheme} from '../../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';
import {partyAtom} from '../../../store/party/atom';
import {appAtom} from '../../../store/app/atom';
import Slider from '../../../components/common/Slider';
import Input from '../../../components/common/Input';
import CButton from '../../../components/common/CButton';
import {Text} from 'react-native';

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

const Party = ({navigation}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [values, setValues] = useState({});
  const [filters, setFilters] = useState({});

  const [app, setApp] = useAtom(appAtom);
  const [party, setParty] = useAtom(partyAtom);
  const user = useAtomValue(userAtom);

  const {data, isFetched} = useQuery({
    queryKey: ['partyList', user.player.world_name],
    queryFn: () => partyApi.getList({world: user.player.world_name}),
  });

  useEffect(() => {
    if (!isFetched) {
      return;
    }
    setParty(prev => ({...prev, list: data?.list}));
  }, [data]);

  const handleChangeInput = (type, text) => {
    setValues(prev => ({...prev, [type]: text}));
  };

  const FilterParty = useCallback(() => {
    return (
      <View style={styles.filterContainer}>
        <CText>레벨</CText>
        <TextInput
          onChangeText={text => handleChangeInput('minLev', text)}
          placeholder="최소"
          placeholderTextColor={theme.gray}
        />
        <TextInput
          onChangeText={text => handleChangeInput('maxLev', text)}
          placeholder="최대"
          placeholderTextColor={theme.gray}
        />
        <CText>경험치</CText>
        <TextInput
          onChangeText={text => handleChangeInput('minExp', text)}
          placeholder="최소"
          placeholderTextColor={theme.gray}
        />
        <TextInput
          onChangeText={text => handleChangeInput('maxExp', text)}
          placeholder="최대"
          placeholderTextColor={theme.gray}
        />
        <CButton
          title="적용"
          onPress={() => {
            setApp(prev => ({
              ...prev,
              bottomSheet: {
                visible: false,
              },
            }));

            setFilters(values);
          }}
        />
      </View>
    );
  }, [values]);

  const Side = navigation => (
    <View style={globalStyles.flexRow}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setApp(prev => ({
            ...prev,
            bottomSheet: {
              visible: true,
              body: FilterParty,
            },
          }));
        }}>
        <Icon name="options-outline" size={20} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.push('AddParty')}
        style={styles.itemContainer}>
        <Icon name="add-circle-outline" size={20} color={theme.text} />
      </TouchableOpacity>
    </View>
  );

  const ListEmptyComponent = useCallback(() => {
    return (
      <>
        <View style={styles.listContainer}>
          <PartyList data={party?.list} />
        </View>
      </>
    );
  }, [party?.list]);

  return (
    <Screen name="파티 목록" side={() => Side(navigation)}>
      {/* <Text>{JSON.stringify(filters)}</Text> */}
      <FlatList
        data={null}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.container}
        renderItem={null}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Party;

const createStyles = theme => {
  return StyleSheet.create({
    container: {
      // padding: 10,
    },
    itemContainer: {
      // width: 40,
      // height: 40,
      borderRadius: 15,
      backgroundColor: theme.backgroundDarker,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
    },
    listContainer: {
      padding: 10,
      paddingBottom: 30,
    },
    filterContainer: {
      padding: 10,
      minHeight: 300,
    },
  });
};
