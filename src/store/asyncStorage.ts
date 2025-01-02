import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async key => {
  const res = await AsyncStorage.getItem(key);

  return res;
};

export const setStorage = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
};

export const removeStorage = async key => {
  return await AsyncStorage.removeItem(key);
};
