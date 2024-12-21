```typescript
import { useState, useEffect, useCallback } from 'react';
import { ZapierClient } from '../lib/zapier/ZapierClient';
import { AIAgent } from '../lib/ai/AIAgent';
import { CustomerSupportWorkflow } from '../lib/workflows/sme/CustomerSupportWorkflow';
import { SalesFollowUpWorkflow } from '../lib/workflows/sme/SalesFollowUpWorkflow';

export function useSMEWorkflows() {
  const [zapier] = useState(() => new ZapierClient({
    apiKey: process.env.ZAPIER_API_KEY || '',
    accountId: process.env.ZAPIER_ACCOUNT_ID || ''
  }));
  const [aiAgent] = useState(() => new AIAgent());

  const [supportWorkflow] = useState(() => new CustomerSupportWorkflow(zapier, aiAgent));
  const [salesWorkflow] = useState(() => new SalesFollowUpWorkflow(zapier, aiAgent));

  const setupWorkflows = useCallback(async () => {
    const [supportConfig, salesConfig] = await Promise.all([
      supportWorkflow.setup(),
      salesWorkflow.setup()
    ]);

    return {
      support: supportConfig,
      sales: salesConfig
    };
  }, [supportWorkflow, salesWorkflow]);

  const processCustomerQuery = useCallback(async (query: any) => {
    await supportWorkflow.processQuery(query);
  }, [supportWorkflow]);

  const processNewLead = useCallback(async (lead: any) => {
    await salesWorkflow.processNewLead(lead);
  }, [salesWorkflow]);

  return {
    setupWorkflows,
    processCustomerQuery,
    processNewLead
  };
}
```