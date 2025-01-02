import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Screen from '../../../components/common/Screen';
import Input from '../../../components/common/Input';
import {useAtomValue} from 'jotai';
import {messagesAtom} from '../../../store/party/atom';
import CText from '../../../components/common/CText';
import {colors} from '../../../style';
import {useSocket} from '../../../hooks/useSocket';
import {userAtom} from '../../../store/user/atom';

const PartyChat = ({item}: {item: any}) => {
  const {socket} = useSocket();
  const messages = useAtomValue(messagesAtom);
  const [text, setText] = useState('');
  const user = useAtomValue(userAtom);
  console.log('useruser', user);

  const listRef = useRef(null);

  const chatRender = useCallback(({item}) => {
    console.log('12312312313', item);
    return (
      <View
        style={[
          styles.message,
          item.player_id === user.player.id
            ? {alignItems: 'flex-end'}
            : {alignItems: 'flex-start'},
        ]}>
        {/* {item.player_id !== user.player.id && ( */}
        <CText color={colors.white}>{item.name}</CText>
        {/* )} */}
        <View
          style={[
            styles.contents,
            // item.user_id === 1
            //   ? {alignItems: 'flex-end'}
            //   : {alignItems: 'flex-start'},
          ]}>
          <CText color={colors.white}>{item.contents}</CText>
        </View>
      </View>
    );
  }, []);

  const onChangeText = (value: string) => {
    setText(value);
  };
  const onSubmitEditing = () => {
    if (!socket) {
      return;
    }

    socket.emit('message', {
      party_id: item.id,
      player_id: user.player.id,
      name: user.player.name,
      contents: text,
    });
    setText('');

    // listRef.current.scrollToIndex({index: 0});
    if (messages.length > 0 && listRef.current) {
      listRef.current.scrollToIndex({index: 0});
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'height' : 'undefined'}>
        <FlatList
          ref={listRef}
          inverted
          style={styles.list}
          data={messages}
          renderItem={chatRender}
        />
        <Input
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          submitBehavior={'blurAndSubmit'}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default PartyChat;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    // backgroundColor: colors.red,
  },
  message: {
    padding: 7,
    // backgroundColor: colors.gray,
    gap: 10,
  },

  contents: {
    padding: 5,
    // justifyContent: 'flex-end',
    // textAlign: 'right',
    // paddingHorizontal: 20,
    // minWidth: 50,
    // paddingHorizontal: 20,
    paddingHorizontal: 10,
    // width: '100%',
    // marginVertical: 5,
    backgroundColor: colors.inputBackground,
    alignItems: 'flex-end',
    // justifyContent: 'flex-start',
    // textAlign: 'right',
    borderRadius: 5,
  },
  keyboardView: {
    flex: 1,
  },
});
