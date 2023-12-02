import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../screens/firebaseConfig'; // 正しいパスに置き換えてください

const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // ログイン成功時の処理
        console.log('Logged in with user: ', userCredential.user);
        // ログイン成功後のナビゲーション
        navigation.navigate('Home');
      })
      .catch((error) => {
        // ログイン失敗時の処理
        Alert.alert('ログイン失敗', error.message);
      });
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FutsalApp</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザー名"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text>新規登録</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text>パスワードを忘れた場合</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  links: {
    marginTop: 20,
  }
});

export default LoginScreen;
