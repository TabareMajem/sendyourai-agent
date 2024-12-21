import { Device } from '@twilio/voice-sdk';

export class TwilioClient {
  private device: Device;
  private connection: any;

  constructor(token: string) {
    this.device = new Device(token, {
      codecPreferences: ['opus', 'pcmu'],
      fakeLocalDTMF: true,
      enableRingingState: true
    });
  }

  async initialize() {
    await this.device.register();
  }

  async makeCall(params: { to: string; from: string }) {
    this.connection = await this.device.connect({ params });
    return this.connection;
  }

  async endCall() {
    if (this.connection) {
      await this.connection.disconnect();
    }
  }

  onConnect(callback: (connection: any) => void) {
    this.device.on('connect', callback);
  }

  onDisconnect(callback: () => void) {
    this.device.on('disconnect', callback);
  }

  onError(callback: (error: Error) => void) {
    this.device.on('error', callback);
  }
}