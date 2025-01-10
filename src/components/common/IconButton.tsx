import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';

const IconButton = ({onPress, name, color}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Icon name={name} size={20} color={color || theme.text} />
    </TouchableOpacity>
  );
};

export default IconButton;

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
