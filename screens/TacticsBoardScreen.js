import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TacticsBoardScreen = () => {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    if (!schedules[currentDate.toISOString().split('T')[0]]) {
      setSchedules({ ...schedules, [currentDate.toISOString().split('T')[0]]: Array(24).fill('') });
    }
  };

  const handleScheduleChange = (time, value) => {
    const dateString = date.toISOString().split('T')[0];
    const updatedSchedules = {...schedules};
    if (!updatedSchedules[dateString]) {
      updatedSchedules[dateString] = Array(24).fill('');
    }
    updatedSchedules[dateString][time] = value;
    setSchedules(updatedSchedules);
  };

  const renderScheduleInputs = () => {
    const dateString = date.toISOString().split('T')[0];
    const dailySchedules = schedules[dateString] || Array(24).fill('');
    return dailySchedules.map((schedule, index) => (
      <View key={index} style={styles.scheduleRow}>
        <Text style={styles.timeText}>{`${index}:00`}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleScheduleChange(index, text)}
          value={schedule}
          placeholder="予定を入力"
        />
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
    <Text style={styles.datePickerText}>日付を選択: {date.toDateString()}</Text>
  </TouchableOpacity>
  {showDatePicker && (
    <DateTimePicker
      value={date}
      mode="date"
      display="default"
      onChange={onChangeDate}
    />
  )}
  {renderScheduleInputs()}
  {/* 保存ボタンを追加 */}
  
  {/* ここに他のUI要素を追加 */}
</ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  datePickerButton: {
    backgroundColor: '#DDD',
    padding: 10,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  timeText: {
    width: 50,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderTopWidth: 0, // 最初の要素以外の上部ボーダーを削除
    borderColor: 'gray',
    flex: 1,
    padding: 8,
  },
  
});

export default TacticsBoardScreen;
