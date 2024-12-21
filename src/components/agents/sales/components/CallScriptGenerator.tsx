import React, { useState } from 'react';
import { Phone, Wand2, Save, Copy, AlertTriangle } from 'lucide-react';

interface CallScript {
  id: string;
  name: string;
  purpose: string;
  script: string;
  talkingPoints: string[];
  objectionHandling: Array<{
    objection: string;
    response: string;
  }>;
}

interface CallScriptGeneratorProps {
  onGenerate: (config: any) => Promise<CallScript>;
  onSave: (script: CallScript) => void;
}

export function CallScriptGenerator({ onGenerate, onSave }: CallScriptGeneratorProps) {
  const [config, setConfig] = useState({
    purpose: '',
    tone: 'professional',
    duration: '5',
    includeObjections: true,
    industry: '',
    targetAudience: '',
    keyPoints: [] as string[]
  });

  const [generatedScript, setGeneratedScript] = useState<CallScript | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const script = await onGenerate(config);
      setGeneratedScript(script);
    } catch (error) {
      console.error('Failed to generate script:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPointAdd = () => {
    setConfig({
      ...config,
      keyPoints: [...config.keyPoints, '']
    });
  };

  const handleKeyPointChange = (index: number, value: string) => {
    const newKeyPoints = [...config.keyPoints];
    newKeyPoints[index] = value;
    setConfig({
      ...config,
      keyPoints: newKeyPoints
    });
  };

  const handleKeyPointRemove = (index: number) => {
    setConfig({
      ...config,
      keyPoints: config.keyPoints.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Call Script Generator</h2>
          </div>
          {generatedScript && (
            <div className="flex space-x-3">
              <button
                onClick={() => onSave(generatedScript)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Script
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(generatedScript.script)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Call Purpose</label>
              <input
                type="text"
                value={config.purpose}
                onChange={(e) => setConfig({ ...config, purpose: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Initial sales outreach, Follow-up call"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Conversation Tone</label>
              <select
                value={config.tone}
                onChange={(e) => setConfig({ ...config, tone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target Duration (minutes)</label>
              <input
                type="number"
                value={config.duration}
                onChange={(e) => setConfig({ ...config, duration: e.target.value })}
                min="1"
                max="30"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                value={config.industry}
                onChange={(e) => setConfig({ ...config, industry: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Technology, Healthcare"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target Audience</label>
              <input
                type="text"
                value={config.targetAudience}
                onChange={(e) => setConfig({ ...config, targetAudience: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., IT Managers, Small Business Owners"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Key Talking Points</label>
                <button
                  onClick={handleKeyPointAdd}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Add Point
                </button>
              </div>
              <div className="space-y-2">
                {config.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleKeyPointChange(index, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter key point"
                    />
                    <button
                      onClick={() => handleKeyPointRemove(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeObjections}
                onChange={(e) => setConfig({ ...config, includeObjections: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Include objection handling suggestions
              </label>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Script
                </>
              )}
            </button>
          </div>

          {/* Generated Script Display */}
          <div className="bg-gray-50 rounded-lg p-6">
            {generatedScript ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Generated Script</h3>
                  <div className="mt-2 prose prose-sm">
                    <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg border border-gray-200">
                      {generatedScript.script}
                    </pre>
                  </div>
                </div>

                {generatedScript.objectionHandling && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Objection Handling
                    </h3>
                    <div className="space-y-4">
                      {generatedScript.objectionHandling.map((oh, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-medium text-gray-900">{oh.objection}</p>
                          <p className="mt-1 text-gray-600">{oh.response}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900">No Script Generated</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure your requirements and click Generate to create a new call script.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}