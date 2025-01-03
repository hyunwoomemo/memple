import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, Animated, StyleSheet} from 'react-native';
import CText from './CText'; // CText 컴포넌트 임포트
import {colors} from '../../style';

interface InputProps {
  ref?: React.RefObject<TextInput>;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  value?: string;
  submitBehavior?: any; // Replace 'any' with the appropriate type if known
  type?: string;
  label?: string;
  flex?: number;
  center?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
}

const Input: React.FC<InputProps> = ({
  ref,
  placeholder,
  secureTextEntry,
  onChangeText,
  onSubmitEditing,
  value,
  submitBehavior,
  type,
  label,
  flex,
  center,
  ...res
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnimation = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocused, labelAnimation, value]);

  const labelStyle = {
    opacity: labelAnimation,
    transform: [
      {
        translateY: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  if (type === 'underline') {
    return (
      <View
        style={[
          styles.withLabelInputContainer,
          flex && {flex},
          center && styles.alignCenter,
        ]}>
        <Animated.View
          style={[
            styles.labelContainer,
            labelStyle,
            center && styles.centerAligned,
          ]}>
          <CText size={16} color={colors.gray}>
            {label}
          </CText>
        </Animated.View>
        <TextInput
          ref={ref}
          keyboardAppearance="dark"
          placeholder={!isFocused ? placeholder : undefined}
          placeholderTextColor={colors.gray}
          style={[
            styles.withLabelInput,
            {borderColor: isFocused ? colors.primary : colors.darkGray},
            center && styles.centeredInput,
          ]}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
          submitBehavior={submitBehavior}
          onFocus={handleFocus}
          onBlur={handleBlur}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize={'none'}
          {...res}
        />
      </View>
    );
  }

  // 다른 타입의 Input 컴포넌트 처리
  return (
    <TextInput
      ref={ref}
      placeholder={placeholder}
      keyboardAppearance="dark"
      placeholderTextColor={colors.gray}
      style={styles.backgroundInput}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      spellCheck={false}
      autoCorrect={false}
      autoCapitalize={'none'}
      value={value}
      submitBehavior={submitBehavior}
      {...res}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  backgroundInput: {
    backgroundColor: colors.inputBackground,
    color: colors.white,
    borderRadius: 10,
    fontSize: 18,
    padding: 15,
    paddingVertical: 15,
    margin: 10,
  },
  withLabelInputContainer: {},
  withLabelInput: {
    margin: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    fontSize: 20,
    color: colors.white,
  },
  labelContainer: {
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  centerAligned: {
    width: '100%',
    alignItems: 'center',
  },
  centeredInput: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
});
