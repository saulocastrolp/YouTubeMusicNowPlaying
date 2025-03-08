import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Player, { usePlaybackState, State, useTrackPlayerEvents, Event, PlaybackErrorEvent } from "react-native-track-player";
import setupPlayer from "react-native-track-player";
import registerPlaybackService from "react-native-track-player";
import { setupPlayer as setupPlayerLocal, addTrack, trackPlayerService } from "./trackPlayer";
import CustomPressableButton from "./components/CustonPressableButton";

// 🔹 Tipagem para a música atual
interface NowPlaying {
    title: string;
    artist: string;
}

interface PlaybackState {
  state: State;
  error?: { code: string; message: string };
}

const API_URL = "https://youtubeconnect.app.br/api/now-playing";

const App: React.FC = () => {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ title: "Nenhuma música tocando", artist: "" });
    const [playbackState, setPlaybackState] = useState<PlaybackState>({
      state: State.None, // Estado inicial correto
      error: { code: "", message: "" },
    });// Hook para monitorar estado da reprodução

    useEffect(() => {
      async function initializePlayer() {
        await setupPlayer({
            androidAudioContentType: "music", // Define o tipo de áudio para Android
            autoHandleInterruptions: true, // Garante que interrupções (ligações) sejam tratadas
            autoUpdateMetadata: true, // Atualiza metadados automaticamente
        });

        updatePlaybackState();
    }

    async function updatePlaybackState() {
        try {
            const statePlayback = await Player.getPlaybackState();
            setPlaybackState({ state: statePlayback, error: { code: "", message: "" } });
        } catch (error: any) {
            setPlaybackState({ state: State.Error, error: { code: "unknown", message: error.message } });
        }
    }

    initializePlayer();
    }, []);

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        const track = event.track;
          if (track) {
              setNowPlaying({
                  title: track.title ?? "Desconhecido",
                  artist: track.artist ?? "Desconhecido",
              });

              fetch(API_URL, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(track),
              })
              .then(response => response.json())
              .then(data => console.log("✅ Enviado:", data))
              .catch(error => console.error("❌ Erro ao enviar:", error));
          }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎵 Música Atual</Text>
            <Text style={styles.track}>{nowPlaying.title}</Text>
            <Text style={styles.artist}>{nowPlaying.artist}</Text>
            <CustomPressableButton title="Adicionar Música" onPress={() => addTrack("Numb", "Linkin Park", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")} />
            <CustomPressableButton title="Iniciar Reprodução" onPress={() => Player.play()} />
            <CustomPressableButton title="Pausar" onPress={() => Player.pause()} />
            <Text style={styles.status}>Status: {playbackState && playbackState.state === State.Playing ? "🎶 Tocando" : "⏸️ Parado"}</Text>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 20, fontWeight: "bold" },
    track: { fontSize: 18, marginTop: 10 },
    artist: { fontSize: 16, color: "gray" },
    status: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
});
