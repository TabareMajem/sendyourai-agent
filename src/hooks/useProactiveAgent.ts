import { useState, useEffect, useCallback } from 'react';
import { ProactiveAgent } from '../lib/ai/ProactiveAgent';
import { AIContext } from '../lib/ai/types';

export function useProactiveAgent(initialConfidence = 0.8) {
  const [agent] = useState(() => new ProactiveAgent(initialConfidence));
  const [isLearning, setIsLearning] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(initialConfidence);

  useEffect(() => {
    return () => {
      agent.cleanup();
    };
  }, [agent]);

  const analyzeSituation = useCallback(async (context: AIContext) => {
    await agent.analyzeSituation(context);
  }, [agent]);

  const toggleLearning = useCallback((enabled: boolean) => {
    if (enabled) {
      agent.enableLearning();
    } else {
      agent.disableLearning();
    }
    setIsLearning(enabled);
  }, [agent]);

  const updateConfidenceThreshold = useCallback((threshold: number) => {
    agent.setConfidenceThreshold(threshold);
    setConfidenceThreshold(threshold);
  }, [agent]);

  return {
    isLearning,
    confidenceThreshold,
    analyzeSituation,
    toggleLearning,
    updateConfidenceThreshold
  };
}