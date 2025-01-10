import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CText from './CText';
import {colors} from '../../style';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';

const Screen: React.FC<{
  children: React.ReactNode;
  name?: string;
  back?: boolean;
  nameSize?: number;
  side?: () => React.ReactNode;
}> = ({children, name, back, nameSize = 24, side}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {back ? (
        <View style={[styles.flexRow, styles.p10]}>
          <TouchableOpacity
            style={{flex: 0, backgroundColor: ''}}
            onPress={() => navigation.goBack()}>
            {/* <CText color={theme.text} bold size={20}>
            </CText> */}
            <Icon name="chevron-back-outline" size={24} color={theme.text} />
          </TouchableOpacity>
          {name ? (
            <View style={styles.title}>
              <CText bold color={theme.text} size={16}>
                {name}
              </CText>
            </View>
          ) : undefined}
          {side && side()}
        </View>
      ) : (
        <View style={[styles.flexRow, styles.p10]}>
          {name ? (
            <CText bold color={theme.text} size={nameSize}>
              {name}
            </CText>
          ) : undefined}
          {side && side()}
        </View>
      )}
      {children}
    </View>
  );
};

export default Screen;

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 10,
      backgroundColor: theme.background,
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // gap: 20,
      paddingVertical: 10,
    },
    title: {
      flex: 10,
      alignItems: 'center',
    },
    p10: {
      padding: 10,
    },
  });

  return styles;
};
