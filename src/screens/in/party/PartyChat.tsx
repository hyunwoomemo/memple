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
import {colors, globalStyles} from '../../../style';
import {useSocket} from '../../../hooks/useSocket';
import {userAtom} from '../../../store/user/atom';
import moment from 'moment';

const PartyChat = ({item}: {item: any}) => {
  const {socket} = useSocket();
  const messages = useAtomValue(messagesAtom);
  const [text, setText] = useState('');
  const user = useAtomValue(userAtom);
  console.log('useruser', user);

  const listRef = useRef(null);

  const chatRender = useCallback(
    ({item}) => {
      return (
        <View
          style={[
            styles.message,
            item.player_id === user.player.id
              ? {alignItems: 'flex-end'}
              : {alignItems: 'flex-start'},
          ]}>
          {/* {item.player_id !== user.player.id && ( */}
          {item.showName && <CText color={colors.gray}>{item.name}</CText>}
          {/* )} */}
          <View
            style={[
              globalStyles.flexRow,
              item.player_id === user.player.id
                ? {flexDirection: 'row-reverse'}
                : {flexDirection: 'row'},
            ]}>
            <View
              style={[
                styles.contents,
                // item.user_id === 1
                //   ? {alignItems: 'flex-end'}
                //   : {alignItems: 'flex-start'},
              ]}>
              <CText color={colors.white}>{item.contents}</CText>
            </View>
            {item.showTime && (
              <View style={styles.created_at}>
                <CText color={colors.gray} size={12}>
                  {moment(item.created_at).format('a HH:mm')}
                </CText>
              </View>
            )}
          </View>
        </View>
      );
    },
    [user],
  );

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
        keyboardVerticalOffset={170}
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
    paddingBottom: 20,
  },

  contents: {
    padding: 10,
    // minWidth: 50,
    // justifyContent: 'flex-end',
    // textAlign: 'right',
    // paddingHorizontal: 20,
    // minWidth: 50,
    // paddingHorizontal: 20,
    paddingHorizontal: 12,
    // width: '100%',
    // marginVertical: 5,
    backgroundColor: colors.inputBackground,
    alignItems: 'flex-end',
    // justifyContent: 'flex-start',
    // textAlign: 'right',
    borderRadius: 5,
    maxWidth: '80%',
  },
  keyboardView: {
    flex: 1,
  },
  created_at: {
    alignSelf: 'flex-end',
  },
});
