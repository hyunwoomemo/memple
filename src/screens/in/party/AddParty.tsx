import React from 'react';
import {View, Text} from 'react-native';
import Screen from '../../../components/common/Screen';
import Input from '../../../components/common/Input';
import Slider from '../../../components/common/Slider';

const AddParty = () => {
  return (
    <Screen name="파티 등록">
      <Input placeholder="파티명" />
      <Input placeholder="사냥터" />
      {/* <Input placeholder="레벨" /> */}
      {/* <Slider /> */}
      <Input placeholder="파경" />
    </Screen>
  );
};

export default AddParty;
