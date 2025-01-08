import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CText from './CText';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import {useTheme} from '../../hooks/useTheme';

interface Route {
  key: string;
  name: string;
}

interface CustomBottomTabProps {
  state: {
    routes: Route[];
    index: number;
  };
  navigation: any;
}

const CustomBottomTab: React.FC<CustomBottomTabProps> = props => {
  const route = useRoute();

  const theme = useTheme();
  const styles = createStyles(theme);

  if (getFocusedRouteNameFromRoute(route) === 'PartyDetailRoute') {
    return;
  }

  return (
    <View style={styles.container}>
      {props.state.routes
        .filter(v => v.name !== 'PartyDetailRoute')
        .map((route, index) => {
          const {options} = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon = options.tabBarIcon;

          const getIsFocused = () => {
            return props.state.index === index;
          };

          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!getIsFocused() && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              style={styles.button}
              onPress={onPress}
              key={route.key}>
              {/* <Text style={styles.text}>{route.name}</Text> */}
              <Icon focused={getIsFocused()} />
              <CText
                size={14}
                color={getIsFocused() ? theme.primary : theme.text}>
                {label}
              </CText>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default CustomBottomTab;

const createStyles = theme => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      // height: 60,
      backgroundColor: theme.bottomTabBg,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      paddingTop: 10,
      marginTop: 10,
      // flex: 1,
    },
    text: {
      color: theme.text,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red',
      padding: 10,
      height: 60,
      gap: 5,
    },
  });
};
