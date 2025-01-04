import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CText from './CText';
import {colors} from '../../style';
import {useTheme} from '../../hooks/useTheme';

interface CButtonProps {
  title: string;
  onPress: () => void;
}

const CButton: React.FC<CButtonProps> = ({title: title, onPress: onPress}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <CText color={theme.text}>{title}</CText>
      </View>
    </TouchableOpacity>
  );
};

export default CButton;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    button: {
      backgroundColor: theme.backgroundDarker,
      // padding: 15,
      borderRadius: 15,
      padding: 15,
      // minWidth: 100,
      alignItems: 'center',
    },
  });
};
