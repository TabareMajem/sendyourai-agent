import React, { useState } from 'react';
import { Bot, Wand2, Loader } from 'lucide-react';

interface AIWorkflowGeneratorProps {
  onWorkflowGenerated: (workflow: any) => void;
}

export function AIWorkflowGenerator({ onWorkflowGenerated }: AIWorkflowGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const workflow = await generateWorkflow(prompt);
      onWorkflowGenerated(workflow);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate workflow');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <Bot className="w-6 h-6 text-indigo-600" />
        <h2 className="text-lg font-medium text-gray-900">AI Workflow Generator</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your workflow (e.g., Send welcome email when new customer signs up)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-2 p-2 bg-red-50 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

// Mock function to simulate workflow generation
async function generateWorkflow(prompt: string) {
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 100, y: 100 },
        data: { label: 'Start', description: 'Workflow trigger' }
      },
      {
        id: '2',
        type: 'action',
        position: { x: 100, y: 200 },
        data: { label: 'Process', description: 'Main action' }
      },
      {
        id: '3',
        type: 'condition',
        position: { x: 100, y: 300 },
        data: { label: 'Check', description: 'Condition check' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' }
    ]
  };
}