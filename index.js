import { AppRegistry } from 'react-native';
import App from './App'; // App.jsからAppコンポーネントをインポート
import { name as appName } from './app.json'; // app.jsonからアプリ名を取得

AppRegistry.registerComponent(appName, () => App);
