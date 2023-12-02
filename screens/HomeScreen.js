import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity ,ScrollView } from 'react-native';
import { firebaseApp } from './firebaseConfig'; // 正しいパスでFirebase設定をインポート
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';



// 画像やブログのデータを取得するフェッチ関数をここに定義
const imageUris = [
  'https://8301440.fs1.hubspotusercontent-na1.net/hubfs/8301440/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202023-11-29%2016.50.36.png',
  'https://8301440.fs1.hubspotusercontent-na1.net/hubfs/8301440/FV2-1.png',
  'https://8301440.fs1.hubspotusercontent-na1.net/hubfs/8301440/%E3%83%A1%E3%83%BC%E3%83%AB1-Sep-04-2023-06-58-52-2100-AM.png',
  // 他の画像URI
];

const HomeScreen = () => {
  // 各種データをステートに保持します
  const [blogPosts, setBlogPosts] = useState([]);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const q = query(collection(db, 'blog')); // 'blog'はFirestore内のコレクション名
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogPosts(blogs);
    });

    return () => unsubscribe();
  }, [db]);

  // フィルターバー、イメージスライダー、ブログリストのヘッダーコンポーネント
  const renderListHeader = () => (
    <View>
      {/* ロゴ */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://storage.googleapis.com/expo-mobile-5e037.appspot.com/2.png' }} // ロゴ画像のURLを指定
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {/* フィルターバー */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterButton}><Text>eBay</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>EXPO</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Awiiin</Text></TouchableOpacity>
      </View>
      {/* イメージスライダー */}
       <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {imageUris.map((uri, index) => (
          <Image key={String(index)} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <FlatList
      data={[...blogPosts]}
      keyExtractor={(item, index) => String(index)}
      ListHeaderComponent={renderListHeader}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardContent}>{item.content}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    height: 60, // 適宜調整
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // ロゴの背景色
    padding: 10,
  },
  logo: {
    height: '100%', // ロゴの高さに合わせて調整
    width: '50%', // ロゴの幅に合わせて調整
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  },
  imageSlider: {
    height: 200, // 適宜調整
    // その他のスタイリング
  },
  card: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    // その他のスタイリング
  },
  cardImage: {
    width: '100%',
    height: 200, // 適宜調整
    // その他のスタイリング
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // その他のスタイリング
  },
  cardContent: {
    fontSize: 14,
    // その他のスタイリング
  },
  image: {
    width: 300, // 画像の幅
    height: 200, // 画像の高さ
    marginRight: 10, // 画像間のマージン
  },
  // その他のスタイリング
});

export default HomeScreen;
