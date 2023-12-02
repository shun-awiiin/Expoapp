import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // expoの場合、またはreact-native-vector-iconsを使う
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebaseの認証機能をインポート

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import VideoScreen from './screens/VideoLibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import ChatDetailScreen from './subscreen/ChatDetailScreen';
import IndividualChatScreen from './subscreen/IndividualChatScreen';


// 他のスクリーンのインポートが必要な場合はここに追加

import { firebaseApp } from './screens/firebaseConfig';

const auth = getAuth(firebaseApp); // Firebaseアプリインスタンスを使用してAuthを取得

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();

// ChatStackを追加して、ChatScreenとChatDetailScreenのナビゲーションを管理します。
const ChatStack = createStackNavigator();

const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen 
      name="Chat" 
      component={ChatScreen} 
      options={{ headerShown: false }} 
    />
    <ChatStack.Screen 
      name="ChatDetail" 
      component={ChatDetailScreen} 
      // ここでオプションを設定できます。
      // 例: options={{ title: 'Chat Details' }}
    />
    <ChatStack.Screen 
      name="IndividualChatScreen" 
      component={IndividualChatScreen}
      options={({ route }) => ({ title: route.params.buyerName })} // オプションで動的にヘッダータイトルを設定
    />
  </ChatStack.Navigator>
);


// メインコンテンツスタック
const MainContentStack = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
        headerShown: false, // これによりヘッダーが非表示になります
      }}
    />
    <Tab.Screen
      name="Video"
      component={VideoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="videocam-outline" color={color} size={size} />
        ),
      }}
    />
     <Tab.Screen
      name="ChatStack"
      component={ChatStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
        ),
    
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
    
      }}
    />
    {/* 他のタブスクリーンをここに追加 */}
  </Tab.Navigator>
);

// 起動時スタック（ログインと登録）
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);
const App = () => {
  // ユーザーログイン状態を表す状態変数とセッター関数
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ログイン状態を監視するリスナーをセットアップ
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // ユーザーがログインしている場合
        setIsLoggedIn(true);
      } else {
        // ユーザーがログインしていない場合
        setIsLoggedIn(false);
      }
    });

    // コンポーネントがアンマウントされるときにリスナーを解除
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        // ログイン状態の場合は MainContentStack を使用
        <MainContentStack />
      ) : (
        // ログイン状態でない場合は AuthStack を使用
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App;