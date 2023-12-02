// IndividualChatScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const IndividualChatScreen = ({ route }) => {
  const { buyerName } = route.params; // ナビゲーションパラメータからバイヤー名を取得
  const [messages, setMessages] = useState([]); // チャットメッセージの状態
  const [newMessage, setNewMessage] = useState(''); // 新しいメッセージ入力の状態

//   useEffect(() => {
//     // メッセージを取得してフィルタリングする仮のロジック
//     const filteredMessages = mockMessages.filter(msg => msg.buyer === buyerName);
//     setMessages(filteredMessages);
//   }, [buyerName]);

  // メッセージ送信関数
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date(),
        sender: 'user', // この例ではユーザーが送信者ですが、実際のアプリでは送信者の情報を管理する必要があります
      };
      setMessages(prevMessages => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  // TODO: 実際のメッセージの読み込みとセラー名に基づいたフィルタリングロジックを実装する

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{buyerName}とのチャット</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="メッセージを入力"
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Text style={styles.sendButton}>送信</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    margin: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#29b6f6',
    color: '#fff',
    borderRadius: 10,
  },
  // その他のスタイル
});

export default IndividualChatScreen;
