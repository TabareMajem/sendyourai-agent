export interface TriggerProps {
  config: Record<string, any>;
  onChange: (config: Record<string, any>) => void;
}

export interface TriggerConfig {
  id: string;
  type: string;
  provider: string;
  conditions?: Record<string, any>;
  settings?: Record<string, any>;
}