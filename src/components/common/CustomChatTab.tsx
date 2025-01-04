import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../style';
import CText from './CText';

interface Route {
  key: string;
  name: string;
}

interface CustomChatTabProps {
  state: {
    routes: Route[];
    index: number;
  };
  navigation: any;
}

const CustomChatTab: React.FC<CustomChatTabProps> = props => {
  return (
    <View style={styles.container}>
      {props.state.routes.map((route, index) => {
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
            <CText bold size={16} color={colors.dark.white}>
              {route.name === 'PartyMain' ? '정보' : '채팅'}
            </CText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomChatTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: colors.dark.gray,
  },
  text: {
    color: colors.dark.white,
  },
});
