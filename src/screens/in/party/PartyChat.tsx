import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableOpacity,
  TextInput,
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
import {useTheme} from '../../../hooks/useTheme';
import Icon from '@react-native-vector-icons/ionicons';

const PartyChat = ({item}: {item: any}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {socket} = useSocket();
  const messages = useAtomValue(messagesAtom);
  const [text, setText] = useState('');
  const user = useAtomValue(userAtom);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const chatRender = useCallback(
    ({item}) => {
      return (
        <>
          <View
            style={[
              styles.message,
              item.player_id === user.player.id
                ? {alignItems: 'flex-end'}
                : {alignItems: 'flex-start'},
            ]}>
            {/* {item.player_id !== user.player.id && ( */}
            {item.showName && <CText color={theme.gray}>{item.name}</CText>}
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
                <CText color={theme.text}>{item.contents}</CText>
              </View>
              {item.showTime && (
                <View style={styles.created_at}>
                  <CText color={theme.gray} size={12}>
                    {moment(item.created_at).format('a HH:mm')}
                  </CText>
                </View>
              )}
            </View>
          </View>
          {item.showFirstDate && (
            <View style={styles.date}>
              <View style={styles.dateItem}>
                <CText>{item.showFirstDate}</CText>
              </View>
            </View>
          )}
        </>
      );
    },
    [user, styles, theme],
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          ref={listRef}
          inverted
          style={styles.list}
          data={messages}
          renderItem={chatRender}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.backgroundDarker,
            marginHorizontal: 10,
            padding: 15,
            // marginHorizontal: 20,
            borderRadius: 15,
          }}>
          {/* <Input
            style={{flex: 1}}
            ref={inputRef}
            value={text}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            // submitBehavior={'blurAndSubmit'}
            returnKeyType="send"
            returnKeyLabel="전송"
            enterKeyHint="send"
            placeholder="메시지를 입력하세요."
            blurOnSubmit={false}
          /> */}
          <TextInput
            style={{flex: 1}}
            ref={inputRef}
            value={text}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            // submitBehavior={'blurAndSubmit'}
            returnKeyType="send"
            returnKeyLabel="전송"
            enterKeyHint="send"
            placeholder="메시지를 입력하세요."
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={onSubmitEditing}>
            <Icon name="send" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default PartyChat;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    list: {
      flex: 1,
      // backgroundColor: theme.red,
    },
    message: {
      padding: 7,
      // backgroundColor: theme.gray,
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
      backgroundColor: theme.backgroundDarker,
      alignItems: 'flex-end',
      // justifyContent: 'flex-start',
      // textAlign: 'right',
      borderRadius: 5,
      maxWidth: '80%',
    },
    keyboardView: {
      flex: 1,
      paddingTop: 10,
    },
    created_at: {
      alignSelf: 'flex-end',
    },
    date: {
      flexDirection: 'row',
      justifyContent: 'center',
      // paddingVertical: 10,
      backgroundColor: theme.backgroundDarker,
      padding: 5,
      margin: 10,
      borderRadius: 15,
    },
    dateItem: {
      // backgroundColor: theme.backgroundDarker,
      // padding: 5,
      // paddingHorizontal: 50,
      // borderRadius: 15,
      // flex: 1,
    },
  });
};
