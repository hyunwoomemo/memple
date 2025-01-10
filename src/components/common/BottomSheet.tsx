import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Modal,
  useAnimatedValue,
} from 'react-native';
import Animated, {
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../../hooks/useTheme';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const BottomSheet = ({
  trigger,
  setTrigger,
  children,
  modal,
  mb,
  dim = true,
}) => {
  // const height = useAnimatedValue(0)

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

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd(e => {
      if (e.velocityY > 500) {
        translateY.value = withTiming(height, {
          duration: 300,
          reduceMotion: ReduceMotion.System,
        });
        opacity.value = withTiming(0, {
          duration: 300,
          reduceMotion: ReduceMotion.System,
        });
        runOnJS(setTrigger)(false);
        // runOnJS(setCartOpenCount)(0);
        // runOnJS(setCart)({...cart, visible: false});
      } else {
        translateY.value = withTiming(0, {
          duration: 300,
          reduceMotion: ReduceMotion.System,
        });
      }
    });

  const handleCloseClick = () => {
    translateY.value = withTiming(height, {
      duration: 300,
      reduceMotion: ReduceMotion.System,
    });
    opacity.value = withTiming(0, {
      duration: 300,
      reduceMotion: ReduceMotion.System,
    });
    runOnJS(setTrigger)(false);
  };

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
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: theme.bottomSheet,
              zIndex: 12,
              pointerEvents: trigger ? 'auto' : 'none',
              padding: 10,
              gap: 5,
            },
            translateYStyle,
          ]}>
          <GestureHandlerRootView>
            <GestureDetector gesture={panGesture}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  // height: 40,
                  paddingBottom: 30,
                }}>
                <View
                  style={{
                    // flex: 1,
                    width: 40,
                    borderRadius: 20,
                    height: 5,
                    backgroundColor: theme.primary,
                  }}
                />
              </View>
            </GestureDetector>
          </GestureHandlerRootView>

          {children}
        </Animated.View>
        {dim && (
          <AnimatedPressable
            onPress={handleCloseClick}
            style={[
              {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: theme.dim,
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
