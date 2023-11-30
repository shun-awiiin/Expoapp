import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PostItem = ({ post }) => {
  // コメント画面やいいねの詳細画面に遷移する関数（仮実装）
  const navigateToComments = () => {
    console.log("コメント画面へ");
    // ここでコメント画面に遷移するロジックを追加
  };

  const navigateToLikes = () => {
    console.log("いいねの詳細画面へ");
    // ここでいいねの詳細画面に遷移するロジックを追加
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.interactions}>
        <TouchableOpacity onPress={navigateToComments}>
          <Text style={styles.interactionText}>{post.comments.length} コメント</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLikes}>
          <Text style={styles.interactionText}>{post.likes} いいね</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  interactionText: {
    color: '#0066CC',
    fontSize: 14,
  },
  // その他のスタイル
});

export default PostItem;
