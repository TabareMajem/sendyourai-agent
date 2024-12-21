import React, { useState, useEffect } from 'react';
import { Phone, Mic, MicOff, Volume2, X } from 'lucide-react';

interface VoiceCallInterfaceProps {
  onStartCall: () => Promise<void>;
  onEndCall: () => Promise<void>;
  onMuteToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export function VoiceCallInterface({
  onStartCall,
  onEndCall,
  onMuteToggle,
  onVolumeChange
}: VoiceCallInterfaceProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return [
      minutes.toString().padStart(2, '0'),
      remainingSeconds.toString().padStart(2, '0')
    ].join(':');
  };

  const handleStartCall = async () => {
    try {
      await onStartCall();
      setIsCallActive(true);
      setDuration(0);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const handleEndCall = async () => {
    try {
      await onEndCall();
      setIsCallActive(false);
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onMuteToggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Voice Call</h2>
          </div>
          {isCallActive && (
            <span className="text-sm font-medium text-gray-500">
              {formatDuration(duration)}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Call Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={isCallActive ? handleEndCall : handleStartCall}
              className={`
                inline-flex items-center justify-center w-16 h-16 rounded-full
                ${isCallActive
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
                }
              `}
            >
              <Phone className="w-8 h-8 text-white" />
            </button>

            {isCallActive && (
              <>
                <button
                  onClick={handleMuteToggle}
                  className={`
                    inline-flex items-center justify-center w-12 h-12 rounded-full
                    ${isMuted ? 'bg-red-100' : 'bg-gray-100'}
                  `}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-red-600" />
                  ) : (
                    <Mic className="w-6 h-6 text-gray-600" />
                  )}
                </button>

                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32"
                  />
                </div>
              </>
            )}
          </div>

          {/* Call Status */}
          {isCallActive && (
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Call in progress</p>
              <p className="text-xs text-gray-500">Connected via Twilio</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}