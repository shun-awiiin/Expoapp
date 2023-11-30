import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // expo-image-pickerを使用

const EditProfileScreen = () => {
  const [userName, setUserName] = useState('ユーザー名');
  const [profileImage, setProfileImage] = useState('https://placekitten.com/200/200');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const saveProfile = async () => {
    // ここでプロフィールデータを保存するロジックを実装
    // 例: APIを呼び出してサーバーにデータを送信
    console.log('Profile saved:', { userName, profileImage });
  };

  return (
    <View style={styles.container}>
      <Button title="プロフィール写真を編集" onPress={pickImage} />
      {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

      <Text>ユーザー名:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
      />

      <Button title="保存" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 20,
  },
});

export default EditProfileScreen;
