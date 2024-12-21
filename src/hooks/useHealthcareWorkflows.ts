```typescript
import { useState, useEffect, useCallback } from 'react';
import { ZapierClient } from '../lib/zapier/ZapierClient';
import { AIAgent } from '../lib/ai/AIAgent';
import { PatientFollowUpWorkflow } from '../lib/workflows/healthcare/PatientFollowUpWorkflow';
import { AppointmentReminderWorkflow } from '../lib/workflows/healthcare/AppointmentReminderWorkflow';

export function useHealthcareWorkflows() {
  const [zapier] = useState(() => new ZapierClient({
    apiKey: process.env.ZAPIER_API_KEY || '',
    accountId: process.env.ZAPIER_ACCOUNT_ID || ''
  }));
  const [aiAgent] = useState(() => new AIAgent());

  const [followUpWorkflow] = useState(() => new PatientFollowUpWorkflow(zapier, aiAgent));
  const [reminderWorkflow] = useState(() => new AppointmentReminderWorkflow(zapier, aiAgent));

  const setupWorkflows = useCallback(async () => {
    const [followUpConfig, reminderConfig] = await Promise.all([
      followUpWorkflow.setup(),
      reminderWorkflow.setup()
    ]);

    return {
      followUp: followUpConfig,
      reminder: reminderConfig
    };
  }, [followUpWorkflow, reminderWorkflow]);

  const processAppointment = useCallback(async (appointmentData: any) => {
    await followUpWorkflow.processAppointment(appointmentData);
  }, [followUpWorkflow]);

  const processUpcomingAppointment = useCallback(async (appointment: any) => {
    await reminderWorkflow.processUpcomingAppointment(appointment);
  }, [reminderWorkflow]);

  return {
    setupWorkflows,
    processAppointment,
    processUpcomingAppointment
  };
}
```