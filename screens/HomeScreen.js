import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity ,ScrollView, Linking } from 'react-native';
import { firebaseApp } from './firebaseConfig'; // 正しいパスでFirebase設定をインポート
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';



// 画像やブログのデータを取得するフェッチ関数をここに定義
const imageUris1 = [
  "https://ewmqoegsx4q.exactdn.com/wp-content/uploads/2023/12/%E7%89%B9%E5%85%B8%E3%81%82%E3%82%8A%EF%BC%81eBay-Japan%E3%81%8C%E6%8F%90%E4%BE%9B%E3%81%99%E3%82%8B%E6%96%B0%E9%85%8D%E9%80%81%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9CPaSS%E7%99%BB%E9%8C%B2%E6%96%B9%E6%B3%95%EF%BC%81.png?strip=all&lossy=1&ssl=1",
  'https://8301440.fs1.hubspotusercontent-na1.net/hubfs/8301440/FV2-1.png',
  'https://8301440.fs1.hubspotusercontent-na1.net/hubfs/8301440/%E3%83%A1%E3%83%BC%E3%83%AB1-Sep-04-2023-06-58-52-2100-AM.png',
  // 他の画像URI
];

const imageUris2 = [
  'https://8301440.fs1.hubspotusercontent-na1.net/hubfs/8301440/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202023-11-29%2016.50.36.png',
  "https://ewmqoegsx4q.exactdn.com/wp-content/uploads/2023/11/%E3%83%AA%E3%82%B5%E3%83%BC%E3%83%81.png?strip=all&lossy=1&ssl=1",
  /* 2回目の画像URLの配列 */];


const HomeScreen = () => {
  // 各種データをステートに保持します
  const [blogPosts, setBlogPosts] = useState([]);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const q = query(collection(db, 'blog'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data().post, // 'post' がドキュメント内のフィールド名になります
        thumbnailUrl: doc.data().thumbnailUrl // 'thumbnailUrl' がドキュメント内のフィールド名になります
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
        {imageUris1.map((uri, index) => (
          <Image key={String(index)} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
      <Text style={styles.Text}>新着ブログ</Text>
    </View>
  );

  const renderListFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Expo news</Text>
        <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {imageUris2.map((uri, index) => (
          <Image key={String(index)} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
        
        {/* その他のフッター要素 */}
      </View>
    );
  };

  

  return (
  <FlatList
  key={`col_${2}`}
  data={blogPosts}
  keyExtractor={item => item.id}
  ListHeaderComponent={renderListHeader} // ここでヘッダーコンポーネントを指定
  ListFooterComponent={renderListFooter}
  numColumns={2} // 2列で表示
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(item.post)}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.cardImage} />
    </TouchableOpacity>
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
    flex: 0.5, // 2列表示のための設定
    margin: 5, // カード間のマージン
    // その他のスタイリング
  },
  cardImage: {
    width: '100%',
    height: 100, // 適宜調整
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
    height: 150, // 画像の高さ
    marginRight: 10, // 画像間のマージン
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  // その他のスタイリング
});

export default HomeScreen;
