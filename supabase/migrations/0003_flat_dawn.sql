/*
  # Sales Schema
  
  1. New Tables
    - sales_leads
    - sales_opportunities
    - sales_activities
    - sales_analytics
    
  2. Security
    - Enable RLS
    - Add policies for sales team access
*/

-- Sales Leads
CREATE TABLE IF NOT EXISTS sales_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'new',
  score integer,
  source text,
  company_name text,
  industry text,
  contact_name text,
  contact_title text,
  contact_email text,
  contact_phone text,
  notes text,
  last_contact timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Sales Opportunities
CREATE TABLE IF NOT EXISTS sales_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES sales_leads(id) ON DELETE SET NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'open',
  stage text NOT NULL,
  value numeric(10,2),
  probability integer,
  expected_close_date date,
  actual_close_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Sales Activities
CREATE TABLE IF NOT EXISTS sales_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES sales_leads(id) ON DELETE CASCADE,
  opportunity_id uuid REFERENCES sales_opportunities(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  scheduled_at timestamptz,
  completed_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb,
  CHECK (lead_id IS NOT NULL OR opportunity_id IS NOT NULL)
);

-- Sales Analytics
CREATE TABLE IF NOT EXISTS sales_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  metric_type text NOT NULL,
  value jsonb NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Enable RLS
ALTER TABLE sales_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their organization's sales data" 
  ON sales_leads FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = sales_leads.organization_id
    )
  );

CREATE POLICY "Sales team can manage leads" 
  ON sales_leads FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = sales_leads.organization_id 
      AND role IN ('admin', 'owner')
    )
  );

-- Similar policies for other tables
CREATE POLICY "Users can view their organization's opportunities" 
  ON sales_opportunities FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = sales_opportunities.organization_id
    )
  );

CREATE POLICY "Sales team can manage opportunities" 
  ON sales_opportunities FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = sales_opportunities.organization_id 
      AND role IN ('admin', 'owner')
    )
  );

-- Indexes
CREATE INDEX idx_sales_leads_org ON sales_leads(organization_id);
CREATE INDEX idx_sales_leads_agent ON sales_leads(agent_id);
CREATE INDEX idx_sales_opps_org ON sales_opportunities(organization_id);
CREATE INDEX idx_sales_opps_lead ON sales_opportunities(lead_id);
CREATE INDEX idx_sales_activities_lead ON sales_activities(lead_id);
CREATE INDEX idx_sales_activities_opp ON sales_activities(opportunity_id);
CREATE INDEX idx_sales_analytics_org ON sales_analytics(organization_id, metric_type);