import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const data = {
  labels: ["Oct 15", "Oct 18", "Oct 21", "Oct 24", "Oct 27", "Oct 30", "Nov 2", "Nov 5", "Nov 8", "Nov 11", "Nov 14"],
  datasets: [
    {
      data: [50000, 100000, 75000,], // 実際の数値に置き換えてください
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    },
  ],
};
const ProfileScreen = () => {
  // ここにプロフィールデータのステートやAPIからのデータ取得などのロジックを記述します

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://ewmqoegsx4q.exactdn.com/wp-content/uploads/2021/07/S__29966339-e1633923620690.jpg?strip=all&lossy=1&ssl=1' }}
          style={styles.profileImage}
        />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1000</Text>
            <Text style={styles.statLabel}>投稿</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50万</Text>
            <Text style={styles.statLabel}>フォロワー</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1000</Text>
            <Text style={styles.statLabel}>フォロー中</Text>
          </View>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>菊池 駿</Text>
        <Text style={styles.bioText}>@shun_kikuchi</Text>
        <Text style={styles.bioDescription}>
          アクアウィンナチュラルグッズボード
          過去30日間に179件のアクションにリーチしました。
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>プロフィールを編集</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
      {/* ...その他のプロフィール情報やアクションボタンなど */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'grey',
  },
  bioContainer: {
    paddingHorizontal: 10,
  },
  bioText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 2,
  },
  bioDescription: {
    color: 'lightgrey',
    fontSize: 14,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  chartContainer: {
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  // ... その他のスタイリング
});

export default ProfileScreen;
