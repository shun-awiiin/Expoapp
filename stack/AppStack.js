// AppStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import VideoScreen from '../screens/VideoLibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
// 他のスクリーンもインポートします

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Video" component={VideoScreen} />
      {/* 他のスクリーンの定義 */}
    </Stack.Navigator>
  );
};

export default AppStack;