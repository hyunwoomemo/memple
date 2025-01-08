/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RootRoute from './src/navigation/RootRoute';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useAtomValue} from 'jotai';
import {isVisibleBottomTabAtom} from './src/store/screen/atom';
import {useTheme} from './src/hooks/useTheme';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // 사용자 설정에 상관없이 폰트사이즈 고정

  if ((Text as any).defaultProps == null) {
    (Text as any).defaultProps = {};
  }
  (Text as any).defaultProps.allowFontScaling = false;

  if ((TextInput as any).defaultProps == null) {
    (TextInput as any).defaultProps = {};
  }
  (TextInput as any).defaultProps.allowFontScaling = false;

  const isVisibleBottomTab = useAtomValue(isVisibleBottomTabAtom);

  const queryClient = new QueryClient();

  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.topContainer}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="RootRoute" component={RootRoute} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <SafeAreaView
        style={[
          isVisibleBottomTab
            ? styles.bottomContainer
            : {backgroundColor: theme.background},
        ]}
      />
    </QueryClientProvider>
  );
}

export default App;

interface Theme {
  background: string;
  bottomTabBg: string;
}

interface Styles {
  topContainer: object;
  bottomContainer: object;
}

const createStyles = (theme: Theme): Styles => {
  const styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    bottomContainer: {
      // flex: 1,
      backgroundColor: theme.bottomTabBg,
    },
  });
  return styles;
};
