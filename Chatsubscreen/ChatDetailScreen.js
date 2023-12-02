import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 



const ChatDetailScreen = ({ route }) => {
  const { chatDetails } = route.params;
  const [isBuyerModalVisible, setBuyerModalVisible] = useState(false);
  // バイヤーの情報を保存する状態を追加
  const [selectedBuyer, setSelectedBuyer] = useState(chatDetails.buyer); // chatDetailsからbuyerを取得
  const navigation = useNavigation(); // ナビゲーションフックを使用
  const handleBuyerSelect = () => {
    navigation.navigate('IndividualChatScreen', { buyerName: selectedBuyer });
    setBuyerModalVisible(false); // モーダルを閉じる
  };

  // バイヤーを選択したときの処理
  const selectBuyer = (buyer) => {
    console.log(`Selected buyer: ${buyer}`);
    setBuyerModalVisible(false);
    navigation.navigate('IndividualChatScreen', { buyerName: buyer }); // ナビゲーションでパラメータを渡す
  };
  

  // バイヤーを選択するためのモーダルの表示を切り替える関数
  const toggleBuyerModal = () => {
    setBuyerModalVisible(!isBuyerModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text>{chatDetails.body}</Text>
      {/* 他のチャット詳細情報を表示するUIコンポーネント */}

      {/* バイヤーを選択するためのボタン */}
      <TouchableOpacity style={styles.openButton} onPress={toggleBuyerModal}>
        <Text style={styles.textStyle}>バイヤーを選択</Text>
      </TouchableOpacity>

      {/* バイヤー選択用のモーダル */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBuyerModalVisible}
        onRequestClose={toggleBuyerModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleBuyerSelect}>
              <Text style={styles.buyerText}>{selectedBuyer}</Text>
            </TouchableOpacity>
            {/* 閉じるボタン */}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={toggleBuyerModal}
            >
              <Text style={styles.textStyle}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// スタイル定義
const styles = StyleSheet.create({
  // ... 他のスタイル定義
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buyerOption: {
    // バイヤー選択肢のスタイル定義
  },
  buyerText: {
    // バイヤー選択肢のテキストのスタイル定義
  },
  buttonClose: {
    // 閉じるボタンのスタイル定義
  }
});

export default ChatDetailScreen;
