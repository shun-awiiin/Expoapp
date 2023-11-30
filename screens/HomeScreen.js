import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import useDailyPhrase from '../subscreen/useDailyPhrase';
import AdminMessage from '../subscreen/AdminMessage';
import PopularVideosScreen from '../subscreen/PopularVideosScreen';


const HomeScreen = () => {
  const dailyPhrase = useDailyPhrase();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://pbs.twimg.com/media/FzETt2QaQAAhPCO?format=jpg&name=large' }}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.catchPhraseContainer}>
        <Text style={styles.mainText}>just know myself</Text>
        <Text style={styles.subText}>〜己を知るだけ〜</Text>
      </View>
      <Text style={styles.dailyPhrase}>{dailyPhrase}</Text>
      <AdminMessage message="今日も一日頑張りましょう！" /> 
      <PopularVideosScreen />
      {/* その他のホーム画面の要素 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  header: {
    height: 50, // 画像の高さを適切に設定
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // ヘッダーの背景色
  },
  headerImage: {
    width: '40%', // 画像をヘッダーの幅いっぱいに表示
    height: '65%', // 画像の高さをヘッダーいっぱいに表示
  },
  catchPhraseContainer: {
    alignItems: 'center', // 中央揃え
    margin: 5,
  },
  mainText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 1, // サブテキストとの間隔
  },
  subText: {
    fontSize: 12,
    color: '#666', // サブテキストを薄く表示
  },
  dailyPhrase: {
    color: '#FFD700', // テキストカラーをゴールドに設定
    fontSize: 18,
    textAlign: 'center',
    margin: 3,
  },
  // その他のスタイリング
});

export default HomeScreen;