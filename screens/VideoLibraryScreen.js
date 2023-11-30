import React, { useState,useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList,SectionList, TouchableOpacity, Image,ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'react-native';
import { Dimensions } from 'react-native';

const videoLessons = [
    {
      id: '1',
      category: '基本',
      title: '基本的なフットサル戦術',
      uri: 'https://www.youtube.com/watch?v=UaVpUVy9Njc&t=1s',
      skill: 'チームプレイとポジショニング',
      thumbnail: 'https://img.youtube.com/vi/UaVpUVy9Njc/0.jpg'
    },
    {
      id: '2',
      category: '基本',
      title: '上級ドリブルテクニック',
      uri: 'https://www.youtube.com/watch?v=wVc2Nnxjz5Y&t=3s',
      skill: '高度なドリブルスキル',
      thumbnail: 'https://img.youtube.com/vi/wVc2Nnxjz5Y/0.jpg'
    },
    {
      id: '3',
      category: '基本',
      title: '守備の基本',
      uri: 'https://www.youtube.com/watch?v=1BSw77hJ_QU&t=2s',
      skill: '効果的な守備テクニック',
      thumbnail: 'https://img.youtube.com/vi/1BSw77hJ_QU/0.jpg'
    },
    {
      id: '4',
      category: '基本',
      title: '攻撃戦略',
      uri: 'https://www.youtube.com/embed/lRiA_2-1mk0',
      skill: '攻撃パターンの構築',
      thumbnail: 'https://img.youtube.com/vi/lRiA_2-1mk0/0.jpg'
    },
    {
      id: '5',
      category: '基本',
      title: 'フィジカルトレーニング',
      uri: 'https://www.youtube.com/embed/HjLvsmlNwzI',
      skill: 'フットサルにおける体力強化',
      thumbnail: 'https://img.youtube.com/vi/HjLvsmlNwzI/0.jpg'
    },
    {
      id: '6',
      category: '戦術',
      title: '守備戦術の詳細解説',
      uri: 'https://www.youtube.com/embed/0-RBGE3Kh8Q',
      skill: '守備の段階分け',
      thumbnail: 'https://img.youtube.com/vi/0-RBGE3Kh8Q/0.jpg',
    },
    {
      id: '7',
      category: 'テクニック',
      title: 'ボールコントロールの極意',
      uri: 'https://www.youtube.com/embed/sdQkxMXowgs',
      skill: 'ボールを操る技術',
      thumbnail: 'https://img.youtube.com/vi/sdQkxMXowgs/0.jpg',
    },
    // 新しい動画データをカテゴリー指定して追加
    {
      id: '8',
      category: 'トレーニング',
      title: 'フットサルでのジャンプ力向上',
      uri: 'https://www.youtube.com/embed/s5XzpMKFwls',
      skill: 'ジャンプ力と瞬発力',
      thumbnail: 'https://img.youtube.com/vi/s5XzpMKFwls/0.jpg',
    },
    {
      id: '9',
      category: '戦術',
      title: '攻撃時のスペースの作り方',
      uri: 'https://www.youtube.com/embed/FV10q82g_mQ',
      skill: 'オフボールムーブメント',
      thumbnail: 'https://img.youtube.com/vi/FV10q82g_mQ/0.jpg',
    },
    {
      id: '10',
      category: 'ドリブル',
      title: 'プロに学ぶコーンドリル',
      uri: 'https://www.youtube.com/embed/s5XzpMKFwls',
      skill: 'ドリブルの基礎と避け方',
      thumbnail: 'https://img.youtube.com/vi/s5XzpMKFwls/0.jpg',
    },

  ];

  const sectionedVideoLessons = Object.values(videoLessons.reduce((acc, video) => {
    if (!acc[video.category]) acc[video.category] = { title: video.category, data: [] };
    acc[video.category].data.push(video);
    return acc;
  }, {}));
  
  const VideoScreen = () => {
    const [currentVideo, setCurrentVideo] = useState(videoLessons[0].uri);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    // WebViewのエラーハンドリング
    const handleWebViewError = () => {
      setError(true);
      setLoading(false);
  };

    useEffect(() => {
        // ここでネットワーク状態やビデオの読み込み状況を確認するロジックを追加する
        // 例えば：
        setLoading(true);
        fetch(currentVideo)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(true);
            });
    }, [currentVideo]);
  
    const renderVideoItem = ({ item }) => (
      <TouchableOpacity onPress={() => setCurrentVideo(item.uri)} style={styles.card}>
        <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.skill}</Text>
        </View>
      </TouchableOpacity>
    );
  
    const renderSectionHeader = ({ section: { title } }) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {isError && <Text style={styles.errorText}>ビデオの読み込みに失敗しました。</Text>}
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <WebView 
              key={currentVideo} // キーとしてcurrentVideoを使用
              style={styles.videoPlayer} 
              source={{ uri: currentVideo }} 
              onError={handleWebViewError}
            />
            
            )}
        <SectionList
          sections={sectionedVideoLessons}
          renderItem={renderVideoItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    videoPlayer: {
      width: Dimensions.get('window').width,
      height: 200, // Adjust the height as required
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    thumbnail: {
      width: 100,
      height: 100,
    },
    cardContent: {
      marginLeft: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 14,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: '#f4f4f4',
      padding: 10,
    },
    separator: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginHorizontal: 16,
    }
  });
  
  export default VideoScreen;