import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PostItem from '../boardscreen/PostItem';
import CreatePostForm from '../boardscreen/CreatePostForm';

// ... その他のインポート

const BoardScreen = () => {
  const [posts, setPosts] = useState([]);

  // 新しい投稿を追加する関数
  const addNewPost = async (newPost) => {
    try {
      // 新しい投稿をAPIに送信
      const response = await fetch('https://your-api-endpoint.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error('投稿の送信に失敗しました。');
      }
      // APIのレスポンスから投稿データを取得
      const addedPost = await response.json();

      // ステートを更新して新しい投稿をリストに追加
      setPosts((prevPosts) => [...prevPosts, addedPost]);
    } catch (error) {
      console.error('投稿の追加に失敗:', error);
    }
  };

  // ... useEffect など

  return (
    <View style={styles.container}>
      <CreatePostForm onSubmit={addNewPost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </View>
  );
};

// ... スタイル定義など


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // その他のスタイル
});

export default BoardScreen;
