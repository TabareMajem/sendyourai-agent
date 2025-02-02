import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { UseCases } from './pages/UseCases';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Support } from './pages/Support';
import { Privacy } from './pages/legal/Privacy';
import { Terms } from './pages/legal/Terms';
import { SignUp } from './pages/auth/SignUp';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Settings } from './pages/settings/Settings';
import { OnboardingFlow } from './pages/onboarding/OnboardingFlow';
import { WorkflowManagement } from './pages/workflows/WorkflowManagement';
import { WorkflowCreator } from './pages/workflows/WorkflowCreator';
import { IntegrationSetup } from './pages/integrations/IntegrationSetup';
import { ZapierDashboard } from './pages/integrations/ZapierDashboard';
import { AnalyticsDashboard } from './pages/analytics/AnalyticsDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AgentsDashboard } from './pages/agents/AgentsDashboard';
import { MarketingCampaignDashboard } from './pages/agents/marketing/MarketingCampaignDashboard';
import { PMODashboard } from './pages/agents/pmo/PMODashboard';
import { SalesAgentConfig } from './pages/agents/sales/SalesAgentConfig';
import { LegalAgentDashboard } from './pages/agents/legal/LegalAgentDashboard';
import { Careers } from './pages/company/Careers';
import { Press } from './pages/company/Press';
import { HumanResources } from './pages/industries/HumanResources';
import { Healthcare } from './pages/industries/Healthcare';
import { RealEstate } from './pages/industries/RealEstate';
import { Ecommerce } from './pages/industries/Ecommerce';
import { Fitness } from './pages/industries/Fitness';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/use-cases" element={<UseCases />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/support" element={<Support />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/press" element={<Press />} />

      {/* Industry Routes */}
      <Route path="/industries/hr" element={<HumanResources />} />
      <Route path="/industries/healthcare" element={<Healthcare />} />
      <Route path="/industries/real-estate" element={<RealEstate />} />
      <Route path="/industries/ecommerce" element={<Ecommerce />} />
      <Route path="/industries/fitness" element={<Fitness />} />

      {/* Auth Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/agents" element={<AgentsDashboard />} />
      <Route path="/agents/marketing" element={<MarketingCampaignDashboard />} />
      <Route path="/agents/pmo" element={<PMODashboard />} />
      <Route path="/agents/sales/config" element={<SalesAgentConfig />} />
      <Route path="/agents/legal" element={<LegalAgentDashboard />} />
      <Route path="/workflows" element={<WorkflowManagement />} />
      <Route path="/workflows/new" element={<WorkflowCreator />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
      <Route path="/integrations" element={<IntegrationSetup />} />
      <Route path="/integrations/zapier" element={<ZapierDashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}