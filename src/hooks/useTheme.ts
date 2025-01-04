import {useAtomValue} from 'jotai';
import {getThemeAtom} from '../store/app/atom';
import {colors} from '../style';

export const useTheme = () => {
  const theme = useAtomValue(getThemeAtom);

  return colors[theme];
};
