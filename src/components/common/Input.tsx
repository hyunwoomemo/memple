import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors} from '../../style';

interface InputProps {
  secureTextEntry?: boolean;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  value?: string;
  submitBehavior?: 'blurAndSubmit' | 'newline' | 'submit';
}

const Input: React.FC<InputProps> = (
  {
    secureTextEntry,
    placeholder,
    onChangeText,
    onSubmitEditing,
    value,
    submitBehavior,
  },
  ref,
) => {
  return (
    <TextInput
      ref={ref}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      value={value}
      submitBehavior={submitBehavior}
    />
  );
};
export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBackground,
    color: colors.white,
    borderRadius: 10,
    fontSize: 18,
    padding: 15,
    paddingVertical: 15,
    margin: 10,
  },
});
