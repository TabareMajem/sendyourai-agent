```typescript
import React, { useState } from 'react';
import { X, Bot, Wand2, Settings, Database } from 'lucide-react';

interface LeadGenerationConfigProps {
  onClose: () => void;
  onSubmit: (config: any) => Promise<void>;
}

export function LeadGenerationConfig({ onClose, onSubmit }: LeadGenerationConfigProps) {
  const [config, setConfig] = useState({
    prospecting: {
      sources: [] as string[],
      criteria: {
        industry: [] as string[],
        companySize: [] as string[],
        location: [] as string[],
        revenue: [] as string[]
      },
      enrichment: {
        enabled: true,
        providers: [] as string[]
      }
    },
    outreach: {
      channels: [] as string[],
      frequency: 'moderate',
      templates: {
        email: true,
        linkedin: false,
        call: false
      }
    },
    qualification: {
      criteria: [] as string[],
      scoreThreshold: 70,
      autoDisqualify: false
    }
  });

  const [activeTab, setActiveTab] = useState('prospecting');

  const handleSubmit = async () => {
    try {
      await onSubmit(config);
      onClose();
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-900">Sales Agent Configuration</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'prospecting', name: 'Lead Prospecting', icon: Database },
                { id: 'outreach', name: 'Outreach Settings', icon: Wand2 },
                { id: 'qualification', name: 'Lead Qualification', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center pb-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Prospecting Settings */}
          {activeTab === 'prospecting' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Sources</label>
                <div className="mt-2 space-y-2">
                  {['LinkedIn', 'ZoomInfo', 'Clearbit', 'Custom Database'].map((source) => (
                    <label key={source} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.prospecting.sources.includes(source)}
                        onChange={(e) => {
                          const sources = e.target.checked
                            ? [...config.prospecting.sources, source]
                            : config.prospecting.sources.filter(s => s !== source);
                          setConfig({
                            ...config,
                            prospecting: { ...config.prospecting, sources }
                          });
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Target Criteria</label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700">Industry</label>
                    <select
                      multiple
                      value={config.prospecting.criteria.industry}
                      onChange={(e) => {
                        const industry = Array.from(e.target.selectedOptions, option => option.value);
                        setConfig({
                          ...config,
                          prospecting: {
                            ...config.prospecting,
                            criteria: { ...config.prospecting.criteria, industry }
                          }
                        });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'].map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">Company Size</label>
                    <select
                      multiple
                      value={config.prospecting.criteria.companySize}
                      onChange={(e) => {
                        const companySize = Array.from(e.target.selectedOptions, option => option.value);
                        setConfig({
                          ...config,
                          prospecting: {
                            ...config.prospecting,
                            criteria: { ...config.prospecting.criteria, companySize }
                          }
                        });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {['1-50', '51-200', '201-1000', '1001-5000', '5000+'].map((size) => (
                        <option key={size} value={size}>{size} employees</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Data Enrichment</label>
                <div className="mt-2 space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.prospecting.enrichment.enabled}
                      onChange={(e) => {
                        setConfig({
                          ...config,
                          prospecting: {
                            ...config.prospecting,
                            enrichment: {
                              ...config.prospecting.enrichment,
                              enabled: e.target.checked
                            }
                          }
                        });
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable data enrichment</span>
                  </label>

                  {config.prospecting.enrichment.enabled && (
                    <div className="pl-6">
                      <label className="block text-sm text-gray-700">Enrichment Providers</label>
                      <div className="mt-2 space-y-2">
                        {['Clearbit', 'ZoomInfo', 'FullContact'].map((provider) => (
                          <label key={provider} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={config.prospecting.enrichment.providers.includes(provider)}
                              onChange={(e) => {
                                const providers = e.target.checked
                                  ? [...config.prospecting.enrichment.providers, provider]
                                  : config.prospecting.enrichment.providers.filter(p => p !== provider);
                                setConfig({
                                  ...config,
                                  prospecting: {
                                    ...config.prospecting,
                                    enrichment: {
                                      ...config.prospecting.enrichment,
                                      providers
                                    }
                                  }
                                });
                              }}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{provider}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Outreach Settings */}
          {activeTab === 'outreach' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Communication Channels</label>
                <div className="mt-2 space-y-2">
                  {['Email', 'LinkedIn', 'Phone'].map((channel) => (
                    <label key={channel} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.outreach.channels.includes(channel)}
                        onChange={(e) => {
                          const channels = e.target.checked
                            ? [...config.outreach.channels, channel]
                            : config.outreach.channels.filter(c => c !== channel);
                          setConfig({
                            ...config,
                            outreach: { ...config.outreach, channels }
                          });
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Outreach Frequency</label>
                <select
                  value={config.outreach.frequency}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      outreach: { ...config.outreach, frequency: e.target.value }
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="conservative">Conservative (1-2 touches/week)</option>
                  <option value="moderate">Moderate (2-3 touches/week)</option>
                  <option value="aggressive">Aggressive (3-4 touches/week)</option>
                </select>
              </div>
            </div>
          )}

          {/* Qualification Settings */}
          {activeTab === 'qualification' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualification Criteria</label>
                <div className="mt-2 space-y-2">
                  {[
                    'Budget Authority',
                    'Need Identified',
                    'Timeline Defined',
                    'Decision Process Clear'
                  ].map((criterion) => (
                    <label key={criterion} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.qualification.criteria.includes(criterion)}
                        onChange={(e) => {
                          const criteria = e.target.checked
                            ? [...config.qualification.criteria, criterion]
                            : config.qualification.criteria.filter(c => c !== criterion);
                          setConfig({
                            ...config,
                            qualification: { ...config.qualification, criteria }
                          });
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{criterion}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Qualification Score Threshold
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.qualification.scoreThreshold}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      qualification: {
                        ...config.qualification,
                        scoreThreshold: parseInt(e.target.value)
                      }
                    });
                  }}
                  className="mt-2 w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{config.qualification.scoreThreshold}</span>
                  <span>100</span>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.qualification.autoDisqualify}
                    onChange={(e) => {
                      setConfig({
                        ...config,
                        qualification: {
                          ...config.qualification,
                          autoDisqualify: e.target.checked
                        }
                      });
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Automatically disqualify leads below threshold
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
```