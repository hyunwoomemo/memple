import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CText from './CText';
import {colors} from '../../style';

interface CButtonProps {
  title: string;
  onPress: () => void;
}

const CButton: React.FC<CButtonProps> = ({title: title, onPress: onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <CText bold color={colors.white}>
          {title}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

export default CButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBackground,
    padding: 15,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
});
