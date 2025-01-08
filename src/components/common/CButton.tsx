import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CText from './CText';
import {colors} from '../../style';
import {useTheme} from '../../hooks/useTheme';

interface CButtonProps {
  title: string;
  onPress: () => void;
  primary?: boolean;
}

const CButton: React.FC<CButtonProps> = ({
  title: title,
  onPress: onPress,
  primary,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, primary);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <CText
          bold={primary ? true : false}
          color={primary ? theme.white : theme.text}>
          {title}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

export default CButton;

const createStyles = (theme: any, primary) => {
  return StyleSheet.create({
    button: {
      backgroundColor: primary ? theme.primary : theme.backgroundDarker,
      // padding: 15,
      borderRadius: 15,
      padding: 15,
      // minWidth: 100,
      alignItems: 'center',
    },
  });
};
