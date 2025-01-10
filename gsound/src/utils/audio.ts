import { getDevices } from 'naudiodon';

class AudioManager {
    public static get devices() {
        return getDevices();
    }

    public static Setup() {
        this.SetupVirtualDevices();
    }

    private static SetupVirtualDevices() {
        
    }
}

export default AudioManager;