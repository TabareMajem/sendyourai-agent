import React, { useState } from 'react';
import { Link2, Plus, Copy, Trash2, AlertTriangle } from 'lucide-react';

interface Webhook {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive';
  lastUsed?: string;
  events: string[];
}

interface ZapierWebhooksProps {
  webhooks: Webhook[];
  onWebhookCreate: (webhook: Omit<Webhook, 'id'>) => void;
  onWebhookDelete: (id: string) => void;
  onWebhookToggle: (id: string) => void;
}

export function ZapierWebhooks({
  webhooks,
  onWebhookCreate,
  onWebhookDelete,
  onWebhookToggle
}: ZapierWebhooksProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    events: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onWebhookCreate({
      ...newWebhook,
      url: `https://api.example.com/webhooks/${Date.now()}`,
      status: 'active',
      events: newWebhook.events
    });
    setNewWebhook({ name: '', events: [] });
    setShowCreateForm(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Link2 className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-medium text-gray-900">Webhooks</h2>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Webhook
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhook Name
              </label>
              <input
                type="text"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Events
              </label>
              <select
                multiple
                value={newWebhook.events}
                onChange={(e) => setNewWebhook({
                  ...newWebhook,
                  events: Array.from(e.target.selectedOptions, option => option.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="workflow.created">Workflow Created</option>
                <option value="workflow.updated">Workflow Updated</option>
                <option value="workflow.deleted">Workflow Deleted</option>
                <option value="workflow.executed">Workflow Executed</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Webhook
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div
            key={webhook.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{webhook.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{webhook.url}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {webhook.events.map((event) => (
                    <span
                      key={event}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {webhook.lastUsed && (
                  <span className="text-xs text-gray-500">
                    Last used: {webhook.lastUsed}
                  </span>
                )}
                <button
                  onClick={() => copyToClipboard(webhook.url)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onWebhookDelete(webhook.id)}
                  className="p-1 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={webhook.status === 'active'}
                    onChange={() => onWebhookToggle(webhook.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            {webhook.status === 'inactive' && (
              <div className="mt-3 flex items-center space-x-2 text-yellow-600 text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>This webhook is currently inactive</span>
              </div>
            )}
          </div>
        ))}

        {webhooks.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <Link2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              No webhooks configured. Create one to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}