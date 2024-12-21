```typescript
import { useState, useEffect } from 'react';
import { TwilioVoiceService } from '../lib/integrations/voice/TwilioVoiceService';

export function useTwilioVoice(token: string) {
  const [voiceService, setVoiceService] = useState<TwilioVoiceService | null>(null);
  const [callStatus, setCallStatus] = useState<string>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const service = new TwilioVoiceService(token);
    
    const initializeService = async () => {
      try {
        await service.initialize((status) => {
          setCallStatus(status);
        });
        setVoiceService(service);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Twilio'));
      }
    };

    initializeService();

    return () => {
      service.cleanup();
    };
  }, [token]);

  const makeCall = async (params: { to: string; from: string }) => {
    if (!voiceService) {
      throw new Error('Voice service not initialized');
    }

    try {
      await voiceService.makeCall(params);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to make call'));
      throw err;
    }
  };

  const endCall = async () => {
    if (!voiceService) return;

    try {
      await voiceService.endCall();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end call'));
      throw err;
    }
  };

  const toggleMute = async (shouldMute: boolean) => {
    if (!voiceService) return;

    try {
      if (shouldMute) {
        await voiceService.mute();
      } else {
        await voiceService.unmute();
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to toggle mute'));
      throw err;
    }
  };

  return {
    callStatus,
    error,
    makeCall,
    endCall,
    toggleMute
  };
}
```