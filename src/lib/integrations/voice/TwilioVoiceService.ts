```typescript
import { Device, Call } from '@twilio/voice-sdk';
import { AppError, ErrorCodes } from '../../utils/errors';

export class TwilioVoiceService {
  private device: Device | null = null;
  private currentCall: Call | null = null;
  private onCallStatusChange?: (status: string) => void;

  constructor(private token: string) {}

  async initialize(onCallStatusChange?: (status: string) => void) {
    try {
      this.device = new Device(this.token, {
        codecPreferences: ['opus', 'pcmu'],
        fakeLocalDTMF: true,
        enableRingingState: true
      });

      this.onCallStatusChange = onCallStatusChange;

      await this.device.register();
      this.setupEventListeners();
    } catch (error) {
      throw new AppError(
        'Failed to initialize Twilio device',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  private setupEventListeners() {
    if (!this.device) return;

    this.device.on('registered', () => {
      this.onCallStatusChange?.('ready');
    });

    this.device.on('error', (error) => {
      console.error('Twilio device error:', error);
      this.onCallStatusChange?.('error');
    });

    this.device.on('incoming', (call) => {
      this.currentCall = call;
      this.onCallStatusChange?.('incoming');
    });
  }

  async makeCall(params: { to: string; from: string }): Promise<void> {
    if (!this.device) {
      throw new AppError(
        'Twilio device not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
      this.currentCall = await this.device.connect({ params });
      this.setupCallEventListeners();
    } catch (error) {
      throw new AppError(
        'Failed to initiate call',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  private setupCallEventListeners() {
    if (!this.currentCall) return;

    this.currentCall.on('accept', () => {
      this.onCallStatusChange?.('connected');
    });

    this.currentCall.on('disconnect', () => {
      this.onCallStatusChange?.('disconnected');
      this.currentCall = null;
    });

    this.currentCall.on('error', (error) => {
      console.error('Call error:', error);
      this.onCallStatusChange?.('error');
    });
  }

  async endCall(): Promise<void> {
    if (this.currentCall) {
      try {
        await this.currentCall.disconnect();
        this.currentCall = null;
      } catch (error) {
        throw new AppError(
          'Failed to end call',
          ErrorCodes.INTEGRATION_ERROR,
          500,
          { error }
        );
      }
    }
  }

  async mute(): Promise<void> {
    if (this.currentCall) {
      try {
        await this.currentCall.mute();
      } catch (error) {
        throw new AppError(
          'Failed to mute call',
          ErrorCodes.INTEGRATION_ERROR,
          500,
          { error }
        );
      }
    }
  }

  async unmute(): Promise<void> {
    if (this.currentCall) {
      try {
        await this.currentCall.unmute();
      } catch (error) {
        throw new AppError(
          'Failed to unmute call',
          ErrorCodes.INTEGRATION_ERROR,
          500,
          { error }
        );
      }
    }
  }

  cleanup(): void {
    if (this.currentCall) {
      this.currentCall.disconnect();
    }
    if (this.device) {
      this.device.destroy();
    }
  }
}
```