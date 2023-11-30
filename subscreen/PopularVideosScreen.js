// PopularVideosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';


const YOUTUBE_API_KEY = 'AIzaSyBBlsY2KIpD50GCqTJ7J-Q07ZWDDccETmE'; // ここに実際のAPIキーをセット
const CHANNEL_ID = 'UCpbAXFvLXA7a4vItLq6h0GQ'; // ここに実際のチャンネルIDをセット

const PopularVideosScreen = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPopularVideos();
  }, []);

  const fetchPopularVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=5&order=viewCount&type=video&key=${YOUTUBE_API_KEY}`
      );
      const json = await response.json();
      setVideos(json.items);
    } catch (error) {
      console.error('YouTube API Error: ', error);
      alert('Failed to fetch popular videos.'); // 実際のアプリでは、より適切なユーザーフィードバックを提供するべきです。
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image style={styles.thumbnail} source={{ uri: item.snippet.thumbnails.medium.url }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.snippet.title}</Text>
        {/* その他の動画情報を表示する場合はここに追加 */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={item => item.id.videoId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  thumbnail: {
    width: 100,
    height: 56, // 16:9 aspect ratio
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 他のスタイリングが必要な場合はここに追加します。
});

export default PopularVideosScreen;