import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Screen from '../../../components/common/Screen';
import Input from '../../../components/common/Input';
import Slider from '../../../components/common/Slider';
import {colors, globalStyles} from '../../../style';
import CText from '../../../components/common/CText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CButton from '../../../components/common/CButton';
import {partyApi} from '../../../api';
import {useAtom, useAtomValue} from 'jotai';
import {userAtom} from '../../../store/user/atom';
import {useQueryClient} from '@tanstack/react-query';
import {appAtom} from '../../../store/app/atom';
import {partyAtom} from '../../../store/party/atom';

interface Values {
  title?: string;
  field?: string;
  minLevel?: number;
  maxLevel?: number;
  exp?: number;
  channel?: number;
  password?: number;
}

const AddParty = ({navigation}) => {
  const [values, setValues] = useState<Values>({});
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const [app, setApp] = useAtom(appAtom);
  const [party, setParty] = useAtom(partyAtom);

  const handleChangeText = (type: keyof Values, value: string | number) => {
    if (type === 'minLevel') {
      if (values.maxLevel !== undefined && Number(value) > values.maxLevel) {
        return setValues(prev => ({
          ...prev,
          maxLevel: Number(value),
          minLevel: Number(value),
        }));
      }
    }

    if (type === 'maxLevel') {
      if (values.minLevel !== undefined && Number(value) < values.minLevel) {
        return setValues(prev => ({
          ...prev,
          minLevel: Number(value),
          maxLevel: Number(value),
        }));
      }
    }

    setValues(prev => ({...prev, [type]: value}));
  };

  const handleAddParty = async () => {
    const res = await partyApi.createParty({
      ...values,
      world_name: user.player.world,
      creator_id: user.player.id,
    });
    console.log('rrr', res);

    if (res.success) {
      await queryClient.invalidateQueries('partyList');
      await queryClient.invalidateQueries('myParty');
      setParty(prev => ({...prev, updatedAt: new Date()}));
      navigation.goBack();
    } else {
      setApp(prev => ({...prev, error: res}));
    }
  };

  return (
    <Screen name="파티 등록" back>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Input
          type="underline"
          label="파티명"
          placeholder="파티명을 입력해주세요."
          value={values.title}
          onChangeText={text => handleChangeText('title', text)}
        />
        <Input
          type="underline"
          label="사냥터"
          placeholder="사냥터를 입력해주세요."
          value={values.region}
          onChangeText={text => handleChangeText('region', text)}
        />
        <View style={globalStyles.flexRow}>
          <Input
            type="underline"
            label="최소 레벨"
            placeholder="최소 레벨"
            value={values.min_level === 0 ? '' : values.min_level?.toString()}
            onChangeText={text => handleChangeText('min_level', Number(text))}
            flex={1}
            center
            keyboardType="number-pad"
          />
          <CText color={colors.dark.white} size={20}>
            ~
          </CText>
          <Input
            type="underline"
            label="최대 레벨"
            placeholder="최대 레벨"
            // value={values.maxLevel?.toString()}
            value={values.max_level === 0 ? '' : values.max_level?.toString()}
            onChangeText={text => handleChangeText('max_level', Number(text))}
            flex={1}
            center
            keyboardType="number-pad"
          />
        </View>
        {/* <Slider /> */}
        <Input
          type="underline"
          label="파티 경험치"
          placeholder="파티 경험치"
          // value={values.maxLevel?.toString()}
          value={
            values.exp_condition === 0 ? '' : values.exp_condition?.toString()
          }
          onChangeText={text => handleChangeText('exp_condition', Number(text))}
          keyboardType="number-pad"
        />
        <Input
          type="underline"
          label="채널"
          placeholder="채널"
          // value={values.maxLevel?.toString()}
          value={values.channel === 0 ? '' : values.channel?.toString()}
          onChangeText={text => handleChangeText('channel', Number(text))}
          keyboardType="number-pad"
        />
        <Input
          type="underline"
          label="비밀번호"
          placeholder="비밀번호"
          // value={values.maxLevel?.toString()}
          value={values.password}
          onChangeText={text => handleChangeText('password', Number(text))}
          keyboardType="number-pad"
        />
        <CButton title="등록" onPress={handleAddParty} />
      </KeyboardAwareScrollView>
      {/* <View style={{flex: 1, backgroundColor: 'red'}}> */}
      {/* </View> */}
    </Screen>
  );
};

export default AddParty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
});
