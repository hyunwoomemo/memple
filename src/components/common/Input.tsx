import React, {useState, useEffect, useRef, forwardRef} from 'react';
import {View, TextInput, Animated, StyleSheet} from 'react-native';
import CText from './CText'; // CText 컴포넌트 임포트
import {colors} from '../../style';
import {useTheme} from '../../hooks/useTheme';
import {useAtom} from 'jotai';
import {appAtom} from '../../store/app/atom';

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
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  returnKeyLabel?: string;
  enterKeyHint?: string;
  blurOnSubmit?: boolean;
}

const Input: React.FC<InputProps> = forwardRef(
  (
    {
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
      returnKeyLabel,
      returnKeyType,
      enterKeyHint,
      blurOnSubmit,
      ...res
    },
    ref,
  ) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const [isFocused, setIsFocused] = useState(false);
    const labelAnimation = useRef(new Animated.Value(0)).current;
    const [app, setApp] = useAtom(appAtom);

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
            <CText size={16} color={theme.gray}>
              {label}
            </CText>
          </Animated.View>
          <TextInput
            ref={ref}
            // keyboardAppearance={'light'}
            keyboardAppearance={app.theme === 'dark' ? 'dark' : 'light'}
            placeholder={!isFocused ? placeholder : undefined}
            placeholderTextColor={theme.gray}
            style={[
              styles.withLabelInput,
              {
                borderColor: isFocused ? theme.primary : theme.darkGray,
              },
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
            returnKeyType={returnKeyType}
            returnKeyLabel={returnKeyLabel}
            enablesReturnKeyAutomatically
            enterKeyHint={enterKeyHint}
            blurOnSubmit={blurOnSubmit}
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
        placeholderTextColor={theme.gray}
        style={styles.backgroundInput}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize={'none'}
        value={value}
        submitBehavior={submitBehavior}
        enablesReturnKeyAutomatically
        enterKeyHint={enterKeyHint}
        blurOnSubmit={blurOnSubmit}
        {...res}
      />
    );
  },
);

export default Input;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    backgroundInput: {
      backgroundColor: theme.backgroundDarker,
      color: theme.text,
      borderRadius: 15,
      padding: 15,
      paddingVertical: 15,
      margin: 10,
      height: 50,
    },
    withLabelInputContainer: {},
    withLabelInput: {
      margin: 5,
      padding: 5,
      borderBottomWidth: 1,
      borderColor: theme.gray,
      color: theme.text,
      height: 50,
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
};
