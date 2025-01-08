import React, {useCallback, useEffect} from 'react';
import {View, Text, useWindowDimensions, Pressable, Modal} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../../hooks/useTheme';

const BottomSheet = ({
  trigger,
  setTrigger,
  children,
  modal,
  mb,
  dim = true,
}) => {
  const {height} = useWindowDimensions();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(height);

  const theme = useTheme();

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const translateYStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  useEffect(() => {
    console.log(trigger);
    if (trigger) {
      opacity.value = withTiming(0.7);
      translateY.value = withTiming(0);
    } else {
      opacity.value = withTiming(0);
      translateY.value = withTiming(height);
    }
  }, [trigger]);

  const BottomSheetBody = () => {
    return (
      <>
        <Animated.View
          style={[
            {
              position: 'absolute',
              marginBottom: mb,
              bottom: 0,
              left: 0,
              right: 0,
              // height: 200,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: theme.background,
              zIndex: 12,
              pointerEvents: trigger ? 'auto' : 'none',
              padding: 10,
              gap: 5,
            },
            translateYStyle,
          ]}>
          {children}
        </Animated.View>
        {dim && (
          <AnimatedPressable
            onPress={() => setTrigger(false)}
            style={[
              {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: theme.backgroundDarker,
                position: 'absolute',
                zIndex: 11,
                pointerEvents: trigger ? 'auto' : 'none',
              },
              opacityStyle,
            ]}
          />
        )}
      </>
    );
  };

  return (
    <>
      {modal ? (
        <Modal transparent pointerEvents="none" visible={trigger?.length > 0}>
          {BottomSheetBody()}
        </Modal>
      ) : (
        <>{BottomSheetBody()}</>
      )}
    </>
  );
};

export default BottomSheet;
