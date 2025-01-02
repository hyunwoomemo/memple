import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../style';
import CText from './CText';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import {useAtomValue} from 'jotai';
import {currentScreenAtom} from '../../store/screen/atom';

interface Route {
  key: string;
  name: string;
}

interface CustomBottmTabProps {
  state: {
    routes: Route[];
    index: number;
  };
  navigation: any;
}

const CustomBottmTab: React.FC<CustomBottmTabProps> = props => {
  const route = useRoute();
  console.log('zxc', getFocusedRouteNameFromRoute(route));

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

          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            const getIsFocused = () => {
              return props.state.index === index;
            };

            if (!getIsFocused() && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity onPress={onPress} key={route.key}>
              {/* <Text style={styles.text}>{route.name}</Text> */}
              <CText bold size={16} color={colors.white}>
                {label}
              </CText>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default CustomBottmTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  text: {
    color: colors.white,
  },
});
