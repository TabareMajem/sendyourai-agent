```typescript
import React, { useState, useEffect } from 'react';
import { Phone, Mic, MicOff, PhoneOff, Volume2 } from 'lucide-react';
import { TwilioVoiceService } from '../../../lib/integrations/voice/TwilioVoiceService';

interface VoiceCallControlsProps {
  token: string;
  onCallStatusChange?: (status: string) => void;
}

export function VoiceCallControls({ token, onCallStatusChange }: VoiceCallControlsProps) {
  const [voiceService, setVoiceService] = useState<TwilioVoiceService | null>(null);
  const [callStatus, setCallStatus] = useState<string>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const service = new TwilioVoiceService(token);
    service.initialize((status) => {
      setCallStatus(status);
      onCallStatusChange?.(status);
    });
    setVoiceService(service);

    return () => {
      service.cleanup();
    };
  }, [token, onCallStatusChange]);

  const handleStartCall = async () => {
    if (!voiceService) return;

    try {
      await voiceService.makeCall({
        to: '+1234567890', // This would come from your actual customer data
        from: '+0987654321' // Your Twilio number
      });
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const handleEndCall = async () => {
    if (!voiceService) return;

    try {
      await voiceService.endCall();
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const handleToggleMute = async () => {
    if (!voiceService) return;

    try {
      if (isMuted) {
        await voiceService.unmute();
      } else {
        await voiceService.mute();
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
    // Implement volume control logic here
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium text-gray-900">
            Call Status: {callStatus}
          </span>
        </div>
        {callStatus === 'connected' && (
          <span className="text-sm text-gray-500">
            Duration: 00:00:00
          </span>
        )}
      </div>

      <div className="flex items-center justify-center space-x-4">
        {callStatus === 'idle' || callStatus === 'disconnected' ? (
          <button
            onClick={handleStartCall}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Phone className="w-5 h-5 mr-2" />
            Start Call
          </button>
        ) : (
          <>
            <button
              onClick={handleToggleMute}
              className={`p-3 rounded-full ${
                isMuted
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={handleEndCall}
              className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {callStatus === 'connected' && (
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
```