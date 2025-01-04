import {StyleSheet} from 'react-native';

export const colors = {
  dark: {
    white: '#F5F5F5',
    text: '#f5f5f5',
    black: '#000000',
    gray: '#9e9e9e',
    lightGray: '#f5f5f5',
    darkGray: '#424242',
    blue: '#477BFF',
    lightBlue: '#5e92f3',
    darkBlue: '#003c8f',
    red: '#dd2c00',
    primary: 'green',
    darkRed: '#c30000',
    yellow: '#ffc400',
    lightYellow: '#fff64f',
    darkYellow: '#c79400',
    green: '#00c853',
    lightGreen: '#5efc82',
    darkGreen: '#009624',
    darkNavy: '#151B29',
    background: '#171717',
    backgroundDarker: 'rgb(33,35,43)',
    lightNavy: '#1F2933',
    charcoal: '#1C1C1C',
    bottomTabBg: '#101010',
  },
  light: {
    white: '#F5F5F5',
    text: '#000',
    black: '#000000',
    gray: 'gray',
    lightGray: '#f5f5f5',
    darkGray: '#424242',
    blue: '#477BFF',
    lightBlue: '#5e92f3',
    darkBlue: '#003c8f',
    red: '#dd2c00',
    primary: 'green',
    darkRed: '#c30000',
    yellow: '#ffc400',
    lightYellow: '#fff64f',
    darkYellow: '#c79400',
    green: '#00c853',
    lightGreen: '#5efc82',
    darkGreen: '#009624',
    darkNavy: '#151B29',
    background: 'rgb(241,242,244)',
    homeBackground: 'rgb(241,242,244)',
    // background: '#f9f9f9',
    backgroundDarker: '#fff',
    lightNavy: '#1F2933',
    charcoal: '#1C1C1C',
    bottomTabBg: '#fff',
  },
};

export const globalStyles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
});
