import React, {useRef} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import IconButton from './IconButton';
import {playerApi} from '../../api';
import {useQueryClient} from '@tanstack/react-query';

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  id,
  swipeableMethods,
  rightRenderItem,
) {
  console.log('id', swipeableMethods);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 100}],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.rightAction]}>
      {rightRenderItem()}
    </Reanimated.View>
  );
}

export default function SwipeableItem({
  children,
  handleSwipeStart,
  id,
  refreshMyPlayers,
  rightRenderItem,
}) {
  const swipeableRef = useRef<ReanimatedSwipeable | null>(null); // Ref to track the current swipeable

  const onSwipeStart = () => {
    if (swipeableRef.current) {
      handleSwipeStart(id, swipeableRef.current);
    }
  };

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={swipeableRef}
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={20}
        renderRightActions={(prog, drag, swipeableMethods) =>
          RightAction(prog, drag, id, swipeableMethods, rightRenderItem)
        }
        // onSwipeableOpen={e => console.log(e)}
        // onActivated={e => console.log(e)}
        onSwipeableWillOpen={onSwipeStart}>
        {children}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  actionContainer: {},
  rightAction: {
    // padding: 10,
    // height: '100%',
    // width: 200,
    // backgroundColor: 'red',
    justifyContent: 'center',
    height: '100%',
    // justifyContent: 'center',
    width: 100,
    alignItems: 'center',
    // flex: 1,
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    // alignItems: 'center',
    justifyContent: 'center',
    // gap: 50,
    // padding: 10,
    // height: 50,
    // backgroundColor: 'papayawhip',
    // alignItems: 'center',
  },
});
