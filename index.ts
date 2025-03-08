import { registerRootComponent } from 'expo';

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./App";
import { setupPlayer, addTrack, trackPlayerService } from "./trackPlayer"; // Importe o serviço
import Player from "react-native-track-player";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// 🔹 REGISTRA O SERVIÇO AQUI
Player.registerPlaybackService(() => trackPlayerService);

AppRegistry.registerComponent(appName, () => App);

registerRootComponent(App);
