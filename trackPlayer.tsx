import Player, {Capability, Event} from "react-native-track-player";

export async function trackPlayerService(): Promise<ServiceHandler> {
    Player.addEventListener(Event.RemotePlay, () => Player.play());
    Player.addEventListener(Event.RemotePause, () => Player.pause());
    Player.addEventListener(Event.RemoteStop, () => Player.stop());
}

// 🔹 Configuração do Track Player para versão 3.2.1
export async function setupPlayer(): Promise<void> {
    try {
        await Player.setupPlayer();
        await Player.updateOptions({
            alwaysPauseOnInterruption: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.Stop,
            ],
        });
        //console.log("✅ Track Player configurado com sucesso!");
    } catch (error) {
        //console.error("❌ Erro ao configurar o Track Player:", error);
    }
}

// 🔹 Adicionar uma música à fila
export async function addTrack(title: string, artist: string, url: string): Promise<void> {
    try {
        await Player.add({
            id: "1",
            url: url,
            title: title,
            artist: artist,
            artwork: "https://via.placeholder.com/150",
        });
        //console.log("🎵 Música adicionada: ", title);
    } catch (error) {
        //console.error("❌ Erro ao adicionar a música:", error);
    }
}

export default {
    setupPlayer,
    addTrack,
    trackPlayerService
};
