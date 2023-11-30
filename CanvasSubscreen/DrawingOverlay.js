// components/DrawingOverlay.js
import React, { useRef, useState } from 'react';
import { View, PanResponder, Dimensions } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import globalStyles from '../styles/globalStyles';

const DrawingOverlay = () => {
  const [currentPath, setCurrentPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setCurrentPath([{ x: gestureState.x0, y: gestureState.y0 }]);
      },
      onPanResponderMove: (evt, gestureState) => {
        setCurrentPath([...currentPath, { x: gestureState.moveX, y: gestureState.moveY }]);
      },
      onPanResponderRelease: () => {
        // 現在のパスをpathsステートに追加
        setPaths([...paths, currentPath]);
        setCurrentPath([]); // 現在のパスをリセット
      }
    })
  ).current;

  // 描画データをSVGのPolylineに変換する関数
  const renderPaths = () => {
    return paths.map((path, index) => (
      <Polyline
        key={index}
        points={path.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="black"
        strokeWidth="5"
      />
    ));
  };

  return (
    <View style={globalStyles.overlay} {...panResponder.panHandlers}>
      <Svg height={Dimensions.get('window').height} width={Dimensions.get('window').width}>
        {renderPaths()}
        {/* 現在描画中のパスを表示 */}
        <Polyline
          points={currentPath.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="black"
          strokeWidth="5"
        />
      </Svg>
    </View>
  );
};

export default DrawingOverlay;
