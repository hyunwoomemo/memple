import React, {ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

interface CTextProps {
  children: ReactNode;
  bold?: boolean;
  size?: number;
  color?: string;
}

const CText: React.FC<CTextProps> = ({children, bold, size, color}) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        styles.text,
        bold && styles.bold,
        size ? {fontSize: size} : {},
        color ? {color: color} : {color: theme.text},
      ]}>
      {children}
    </Text>
  );
};

export default CText;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
});
