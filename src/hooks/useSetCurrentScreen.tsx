import {useAtom} from 'jotai';
import {currentScreenAtom} from '../store/screen/atom';
import {useCallback, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

export const useSetCurrentScreen = (screen: string) => {
  console.log('screen', screen);

  const [, setCurrentScreen] = useAtom(currentScreenAtom);

  useFocusEffect(
    useCallback(() => {
      setCurrentScreen(screen);
    }, [screen]),
  );

  // useEffect(() => {
  //   setCurrentScreen(screen);
  // }, [screen]);
};
