import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AdminMessage = ({ message }) => {
  // 実際の画像URLを設定する（ここでは例としてプレースホルダーURLを使用）
  const actualImageUri = 'https://pbs.twimg.com/profile_images/1546537073985060864/gAv-MbUp_400x400.jpg';
  const defaultImageUri = 'https://pbs.twimg.com/profile_images/1546537073985060864/gAv-MbUp_400x400.jpg';

  // 画像読み込みエラー時の処理
  const handleImageError = () => {
    console.error('管理者アイコンの画像読み込みに失敗しました');
    // 必要に応じて代替の処理をここに追加
  };

  return (
    <View style={styles.messageContainer}>
      <Image
        source={{ uri: actualImageUri }}
        defaultSource={{ uri: defaultImageUri }}
        style={styles.icon}
        accessibilityLabel="管理者アイコン"
        onError={handleImageError}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  message: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default AdminMessage;
