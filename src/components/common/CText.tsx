import React, {ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CTextProps {
  children: ReactNode;
  bold?: boolean;
  size?: number;
  color?: string;
}

const CText: React.FC<CTextProps> = ({children, bold, size, color}) => {
  return (
    <Text
      style={[
        styles.text,
        bold && styles.bold,
        size ? {fontSize: size} : {},
        color ? {color: color} : {},
      ]}>
      {children}
    </Text>
  );
};

export default CText;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
});
