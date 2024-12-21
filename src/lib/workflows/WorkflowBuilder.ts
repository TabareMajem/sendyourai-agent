import { v4 as uuidv4 } from 'uuid';
import { Workflow, ValidationResult } from './types';
import { IntegrationHandler } from './IntegrationHandler';

export class WorkflowBuilder {
  private integrationHandler: IntegrationHandler;

  constructor() {
    this.integrationHandler = new IntegrationHandler();
  }

  createFromTemplate(template: any, customization: any): Workflow {
    const workflow: Workflow = {
      id: uuidv4(),
      name: customization.name || template.name,
      description: customization.description || template.description,
      triggers: this.customizeTriggers(template.triggers, customization),
      actions: this.customizeActions(template.actions, customization),
      deploymentType: customization.deploymentType || 'url',
      status: 'draft'
    };

    return workflow;
  }

  async validate(workflow: Workflow): Promise<ValidationResult> {
    const errors: string[] = [];

    // Validate configuration
    try {
      const configValidation = await this.validateConfig(workflow);
      if (!configValidation.isValid) {
        errors.push(...configValidation.errors);
      }
    } catch (error) {
      errors.push('Failed to validate configuration');
    }

    // Test integrations
    try {
      const integrationValidation = await this.testIntegrations(workflow);
      if (!integrationValidation.isValid) {
        errors.push(...integrationValidation.errors);
      }
    } catch (error) {
      errors.push('Failed to validate integrations');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private customizeTriggers(templateTriggers: any[], customization: any) {
    return templateTriggers.map(trigger => ({
      ...trigger,
      config: {
        ...trigger.config,
        ...(customization.triggerConfig || {})
      }
    }));
  }

  private customizeActions(templateActions: any[], customization: any) {
    return templateActions.map(action => ({
      ...action,
      config: {
        ...action.config,
        ...(customization.actionConfig || {})
      }
    }));
  }

  private async validateConfig(workflow: Workflow): Promise<ValidationResult> {
    const errors: string[] = [];

    // Validate basic structure
    if (!workflow.name) errors.push('Workflow name is required');
    if (!workflow.triggers.length) errors.push('At least one trigger is required');
    if (!workflow.actions.length) errors.push('At least one action is required');

    // Validate trigger configurations
    for (const trigger of workflow.triggers) {
      if (!trigger.type) errors.push('Trigger type is required');
      if (!trigger.config) errors.push('Trigger configuration is required');
    }

    // Validate action configurations
    for (const action of workflow.actions) {
      if (!action.type) errors.push('Action type is required');
      if (!action.service) errors.push('Action service is required');
      if (!action.config) errors.push('Action configuration is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private async testIntegrations(workflow: Workflow): Promise<ValidationResult> {
    const errors: string[] = [];

    // Test each integration used in the workflow
    const integrations = new Set(workflow.actions.map(action => action.service));

    for (const integration of integrations) {
      try {
        // Test integration connection
        await this.integrationHandler.executeAction({
          service: integration,
          type: 'test',
          config: {}
        }, {});
      } catch (error) {
        errors.push(`Failed to validate ${integration} integration`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}