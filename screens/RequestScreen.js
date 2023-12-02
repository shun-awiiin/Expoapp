import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';

const RequestScreen = () => {
  const [url, setUrl] = useState('https://exponential.awiiin.com/chat');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setUrl(text)}
        value={url}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>送信</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>最新</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>30日前</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>デンプレート</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.url}>{url}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'white',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  url: {
    color: 'lightblue',
    textDecorationLine: 'underline',
  }
});

export default RequestScreen;
