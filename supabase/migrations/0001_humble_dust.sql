/*
  # Organizations Schema
  
  1. New Tables
    - organizations
    - organization_members
    
  2. Security
    - Enable RLS
    - Add policies for organization access
*/

-- Organizations
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Organization Members
CREATE TABLE IF NOT EXISTS organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Policies for organizations
CREATE POLICY "Users can view their organizations" ON organizations
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members WHERE organization_id = id
    )
  );

CREATE POLICY "Organization admins can update their organizations" ON organizations
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = id AND role IN ('admin', 'owner')
    )
  );

-- Policies for organization members
CREATE POLICY "Users can view members in their organizations" ON organization_members
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = organization_members.organization_id
    )
  );

CREATE POLICY "Organization admins can manage members" ON organization_members
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = organization_members.organization_id 
      AND role IN ('admin', 'owner')
    )
  );

-- Indexes
CREATE INDEX idx_org_members_user ON organization_members(user_id);
CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_slug ON organizations(slug);