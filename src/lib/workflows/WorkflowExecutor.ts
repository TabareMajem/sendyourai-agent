import { Workflow, ExecutionContext } from './types';
import { IntegrationHandler } from './IntegrationHandler';
import { AppError, ErrorCodes } from '../utils/errors';

export class WorkflowExecutor {
  private integrationHandler: IntegrationHandler;

  constructor() {
    this.integrationHandler = new IntegrationHandler();
  }

  async execute(workflow: Workflow, context: ExecutionContext) {
    // Validate workflow
    if (!this.validateWorkflow(workflow)) {
      throw new AppError(
        'Invalid workflow configuration',
        ErrorCodes.VALIDATION_ERROR
      );
    }

    // Initialize execution context
    const executionContext = this.createExecutionContext(workflow, context);

    try {
      // Execute triggers
      await this.executeTriggers(workflow.triggers, executionContext);

      // Check conditions
      if (!await this.evaluateConditions(workflow.conditions, executionContext)) {
        return;
      }

      // Execute actions
      await this.executeActions(workflow.actions, executionContext);

    } catch (error) {
      await this.handleError(error, executionContext);
      throw error;
    }
  }

  private validateWorkflow(workflow: Workflow): boolean {
    try {
      // Validate using Zod schema
      WorkflowSchema.parse(workflow);
      return true;
    } catch {
      return false;
    }
  }

  private createExecutionContext(workflow: Workflow, context: ExecutionContext) {
    return {
      ...context,
      workflow,
      variables: {},
      logs: []
    };
  }

  private async executeTriggers(triggers: Workflow['triggers'], context: any) {
    for (const trigger of triggers) {
      await this.integrationHandler.executeTrigger(trigger, context);
    }
  }

  private async evaluateConditions(conditions: any[], context: any): Promise<boolean> {
    if (!conditions?.length) return true;

    for (const condition of conditions) {
      if (!await this.evaluateCondition(condition, context)) {
        return false;
      }
    }

    return true;
  }

  private async evaluateCondition(condition: any, context: any): Promise<boolean> {
    const { field, operator, value } = condition;
    const actualValue = await this.resolveValue(field, context);

    switch (operator) {
      case 'equals':
        return actualValue === value;
      case 'notEquals':
        return actualValue !== value;
      case 'contains':
        return String(actualValue).includes(String(value));
      case 'greaterThan':
        return actualValue > value;
      case 'lessThan':
        return actualValue < value;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

  private async executeActions(actions: Workflow['actions'], context: any) {
    for (const action of actions) {
      try {
        await this.integrationHandler.executeAction(action, context);
      } catch (error) {
        if (action.fallback) {
          await this.integrationHandler.executeAction(action.fallback, context);
        } else {
          throw error;
        }
      }
    }
  }

  private async handleError(error: unknown, context: any) {
    console.error('Workflow execution error:', error);
    // Log error and execution context
    // Notify relevant parties
    // Handle rollback if needed
  }

  private async resolveValue(field: string, context: any): Promise<any> {
    // Handle nested field paths
    const parts = field.split('.');
    let value = context;
    
    for (const part of parts) {
      value = value[part];
      if (value === undefined) break;
    }

    return value;
  }
}