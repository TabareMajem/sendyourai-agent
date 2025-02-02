import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface BehaviorConfig {
  autonomyLevel: number;
  decisionSpeed: number;
  riskTolerance: number;
  proactivityLevel: number;
}

export function BehaviorSettings() {
  const [config, setConfig] = useState<BehaviorConfig>({
    autonomyLevel: 50,
    decisionSpeed: 70,
    riskTolerance: 30,
    proactivityLevel: 60
  });

  const handleChange = (key: keyof BehaviorConfig, value: number) => {
    setConfig({ ...config, [key]: value });
  };

  const renderSlider = (
    key: keyof BehaviorConfig,
    label: string,
    description: string,
    lowLabel: string,
    highLabel: string
  ) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-500">{config[key]}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={config[key]}
        onChange={(e) => handleChange(key, parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSlider(
        'autonomyLevel',
        'Autonomy Level',
        'Control how independently the AI can make and execute decisions',
        'Human Approval',
        'Full Autonomy'
      )}

      {renderSlider(
        'decisionSpeed',
        'Decision Speed',
        'Balance between quick responses and thorough analysis',
        'Thorough',
        'Quick'
      )}

      {renderSlider(
        'riskTolerance',
        'Risk Tolerance',
        'Set the acceptable level of risk for AI decisions',
        'Conservative',
        'Aggressive'
      )}

      {renderSlider(
        'proactivityLevel',
        'Proactivity Level',
        'Determine how proactively the AI suggests and takes actions',
        'Reactive',
        'Proactive'
      )}

      {config.riskTolerance > 70 && (
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                High Risk Configuration
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                The current risk tolerance setting may lead to more aggressive decision-making.
                Ensure you have appropriate monitoring and safeguards in place.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}