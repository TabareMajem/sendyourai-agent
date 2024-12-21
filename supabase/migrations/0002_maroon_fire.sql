/*
  # AI Agents Schema
  
  1. New Tables
    - agents
    - agent_conversations
    - agent_actions
    - agent_analytics
    - agent_training_data
    - agent_integrations
    
  2. Security
    - Enable RLS
    - Add policies for proper access control
*/

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  configuration jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'inactive',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  metadata jsonb
);

-- Agent conversations
CREATE TABLE IF NOT EXISTS agent_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  context jsonb NOT NULL DEFAULT '{}',
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  status text NOT NULL DEFAULT 'active',
  metadata jsonb
);

-- Agent actions
CREATE TABLE IF NOT EXISTS agent_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES agent_conversations(id) ON DELETE SET NULL,
  type text NOT NULL,
  action jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  executed_at timestamptz,
  result jsonb,
  error jsonb,
  metadata jsonb
);

-- Agent analytics
CREATE TABLE IF NOT EXISTS agent_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  metric_type text NOT NULL,
  value jsonb NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Agent training data
CREATE TABLE IF NOT EXISTS agent_training_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  data_type text NOT NULL,
  content jsonb NOT NULL,
  feedback jsonb,
  validated boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Agent integrations
CREATE TABLE IF NOT EXISTS agent_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  config jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'inactive',
  last_sync timestamptz,
  metadata jsonb
);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their organization's agents" ON agents
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = agents.organization_id
    )
  );

CREATE POLICY "Users can manage their organization's agents" ON agents
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = agents.organization_id 
      AND role IN ('admin', 'owner')
    )
  );

-- Policies for agent conversations
CREATE POLICY "Users can view their conversations" ON agent_conversations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their conversations" ON agent_conversations
  FOR ALL USING (user_id = auth.uid());

-- Indexes
CREATE INDEX idx_agents_org ON agents(organization_id);
CREATE INDEX idx_agent_convos ON agent_conversations(agent_id);
CREATE INDEX idx_agent_actions ON agent_actions(agent_id, conversation_id);
CREATE INDEX idx_agent_analytics ON agent_analytics(agent_id, metric_type);