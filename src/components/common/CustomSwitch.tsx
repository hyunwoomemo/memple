import React, {useEffect} from 'react';
import {View, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {colors} from '../../style';
import {useTheme} from '../../hooks/useTheme';

const CustomSwitch = ({on, onPress}) => {
  const leftValue = useSharedValue(on ? 22 : 3);
  const bgc = useSharedValue('#333');
  const itemBgc = useSharedValue('#999');
  const itemWidth = useSharedValue(25);

  const theme = useTheme();

  const leftStyle = useAnimatedStyle(() => {
    return {
      left: leftValue.value,
      backgroundColor: itemBgc.value,
      width: itemWidth.value,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgc.value,
    };
  });

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedView = Animated.createAnimatedComponent(View);

  const panGesture = Gesture.Pan()
    .onBegin(e => {
      itemWidth.value = withTiming(30, {duration: 300});
      if (on) {
        leftValue.value = withTiming(17, {duration: 300});
      }
    })
    .onFinalize(e => {
      itemWidth.value = withTiming(25, {duration: 300});
      if (on) {
        leftValue.value = withTiming(22, {duration: 300});
      }
    });
  useEffect(() => {
    if (!on) {
      leftValue.value = withTiming(3, {duration: 300});
      itemBgc.value = withTiming(theme.white, {duration: 300});
      bgc.value = withTiming(theme.gray, {duration: 300});
      itemWidth.value = withSequence(
        withTiming(35, {duration: 150}),
        withTiming(25, {duration: 150}),
      );
    } else {
      leftValue.value = withSequence(
        withTiming(12, {duration: 150}),
        withTiming(22, {duration: 150}),
      );
      bgc.value = withTiming(theme.primary, {duration: 300});
      itemBgc.value = withTiming('#fff', {duration: 300});
      itemWidth.value = withSequence(
        withTiming(35, {duration: 150}),
        withTiming(25, {duration: 150}),
      );
    }
  }, [on, bgc, itemBgc, itemWidth, leftValue, theme.gray, theme.primary]);

  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: on ? theme.primary : theme.backgroundDarker,
          padding: 5,
          borderRadius: 50,
          width: 50,
          height: 30,
          justifyContent: 'center',
        },
        containerStyle,
      ]}
      onPress={onPress}>
      <GestureDetector gesture={panGesture}>
        <AnimatedView
          style={[
            {
              width: 25,
              height: 25,
              backgroundColor: on ? theme.background : theme.backgroundDarker,
              borderRadius: 50,
              position: 'absolute',
            },
            leftStyle,
          ]}
        />
      </GestureDetector>
    </AnimatedPressable>
  );
};

export default CustomSwitch;
