import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { firebaseApp } from './firebaseConfig';

const firestore = getFirestore(firebaseApp);

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'data'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedChats = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(updatedChats);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ChatDetail', { chatDetails: item })}
    >
      {/* 画像が存在する場合は表示 */}
      {item.pictures && item.pictures[0] && (
        <Image source={{ uri: item.pictures[0] }} style={styles.image} />
      )}
      {/* チャットの本文 */}
      <Text style={styles.title}>{item.body}</Text>
      {/* {/* バイヤーネーム*} */}
      <Text style={styles.detail}>{`Buyer: ${item.buyer}`}</Text>
      {/* セラーネーム */}
      {/* チャットの作成日時 */}
      <Text style={styles.detail}>{`Created at: ${item.created_at}`}</Text>
      {/* イベントタイプ */}
      <Text style={styles.detail}>{`Event type: ${item.event_type}`}</Text>
      {/* 価格情報があれば表示 */}
      {item.price && <Text style={styles.price}>{`Price: ${item.price}`}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const handleSelectBuyer = (buyer) => {
  navigation.navigate('ChatDetail', { buyer: buyer });
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default ChatList;
