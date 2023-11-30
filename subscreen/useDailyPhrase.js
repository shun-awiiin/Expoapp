import { useState, useEffect } from 'react';

const phrases = [
  "変化に敏感であれ。",
  "小さな一歩が大きな変化を生む。",
  "毎日が新しい学び。",
  "失敗は成功のもと。",
  "一期一会を大切に。",
  "可能性は無限大。",
  "挑戦は成長の始まり。",
  "感謝の心を忘れずに。",
  "今日を最善に生きる。",
  "夢を追い続けろ。",
  // 他にも多数の格言をリストアップ
];

const useDailyPhrase = () => {
  const [dailyPhrase, setDailyPhrase] = useState('');

  useEffect(() => {
    const getDailyPhrase = () => {
      const today = new Date();
      const index = today.getDate() % phrases.length; // 日付を使って格言を選ぶ
      setDailyPhrase(phrases[index]);
    };

    getDailyPhrase(); // 関数を呼び出し

    // 0時になったら格言を更新する
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // 翌日の0時0分0秒0ミリ秒をセット

    const timeoutId = setTimeout(() => {
      getDailyPhrase(); // 翌日の格言をセットする
    }, tomorrow - new Date()); // 現在から翌日の0時までのミリ秒

    return () => clearTimeout(timeoutId); // コンポーネントのアンマウント時にタイマーをクリア
  }, []);

  return dailyPhrase;
};


export default useDailyPhrase;