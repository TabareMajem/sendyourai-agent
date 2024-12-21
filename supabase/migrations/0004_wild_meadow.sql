/*
  # Customer Support Schema
  
  1. New Tables
    - support_tickets
    - support_interactions
    - support_knowledge_base
    - support_analytics
    
  2. Security
    - Enable RLS
    - Add policies for support team access
*/

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  customer_id uuid REFERENCES auth.users(id),
  subject text NOT NULL,
  description text,
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  category text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  metadata jsonb
);

-- Support Interactions
CREATE TABLE IF NOT EXISTS support_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  type text NOT NULL,
  content text NOT NULL,
  sentiment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Support Knowledge Base
CREATE TABLE IF NOT EXISTS support_knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  tags text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Support Analytics
CREATE TABLE IF NOT EXISTS support_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  metric_type text NOT NULL,
  value jsonb NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Enable RLS
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their organization's tickets" 
  ON support_tickets FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = support_tickets.organization_id
    )
  );

CREATE POLICY "Support team can manage tickets" 
  ON support_tickets FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = support_tickets.organization_id 
      AND role IN ('admin', 'owner')
    )
  );

-- Indexes
CREATE INDEX idx_support_tickets_org ON support_tickets(organization_id);
CREATE INDEX idx_support_tickets_customer ON support_tickets(customer_id);
CREATE INDEX idx_support_interactions_ticket ON support_interactions(ticket_id);
CREATE INDEX idx_support_kb_org ON support_knowledge_base(organization_id);
CREATE INDEX idx_support_kb_category ON support_knowledge_base(category);
CREATE INDEX idx_support_analytics_org ON support_analytics(organization_id, metric_type);