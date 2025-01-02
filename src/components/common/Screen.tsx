import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CText from './CText';
import {colors} from '../../style';
import {useNavigation} from '@react-navigation/native';

const Screen: React.FC<{
  children: React.ReactNode;
  name?: string;
  back?: boolean;
  nameSize?: number;
}> = ({children, name, back, nameSize = 24}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {back ? (
        <View style={styles.flexRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CText color={colors.white} bold size={20}>
              {'<'}
            </CText>
          </TouchableOpacity>
          {name ? (
            <View style={styles.title}>
              <CText bold color={colors.white} size={16}>
                {name}
              </CText>
            </View>
          ) : undefined}
          <View />
        </View>
      ) : (
        <>
          {name ? (
            <CText bold color={colors.white} size={nameSize}>
              {name}
            </CText>
          ) : undefined}
        </>
      )}
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
});
