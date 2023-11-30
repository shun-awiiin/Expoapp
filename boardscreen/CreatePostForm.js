import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CreatePostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePress = () => {
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="タイトル"
        style={styles.input}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="内容"
        multiline
        style={[styles.input, styles.contentInput]}
      />
      <Button title="投稿" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  // その他のスタイル
});

export default CreatePostForm;
