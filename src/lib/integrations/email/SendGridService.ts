```typescript
import { MailService } from '@sendgrid/mail';
import { AppError, ErrorCodes } from '../../utils/errors';

export class SendGridService {
  private client: MailService;

  constructor(apiKey: string) {
    this.client = new MailService();
    this.client.setApiKey(apiKey);
  }

  async sendEmail(params: {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html?: string;
    templateId?: string;
    dynamicTemplateData?: Record<string, any>;
  }): Promise<void> {
    try {
      await this.client.send({
        to: params.to,
        from: params.from,
        subject: params.subject,
        text: params.text,
        html: params.html,
        templateId: params.templateId,
        dynamicTemplateData: params.dynamicTemplateData
      });
    } catch (error) {
      throw new AppError(
        'Failed to send email',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async sendBulkEmails(params: {
    to: string[];
    from: string;
    subject: string;
    text?: string;
    html?: string;
    templateId?: string;
    dynamicTemplateData?: Record<string, any>;
  }): Promise<void> {
    try {
      const messages = params.to.map(recipient => ({
        to: recipient,
        from: params.from,
        subject: params.subject,
        text: params.text,
        html: params.html,
        templateId: params.templateId,
        dynamicTemplateData: params.dynamicTemplateData
      }));

      await this.client.send(messages);
    } catch (error) {
      throw new AppError(
        'Failed to send bulk emails',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async getEmailTemplate(templateId: string): Promise<any> {
    try {
      // Note: SendGrid API doesn't provide direct template retrieval
      // This is a placeholder for when you need to manage templates
      return { id: templateId };
    } catch (error) {
      throw new AppError(
        'Failed to get email template',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async createEmailTemplate(template: {
    name: string;
    subject: string;
    html: string;
  }): Promise<any> {
    try {
      // Note: SendGrid API doesn't provide direct template creation via API
      // This is a placeholder for when you need to manage templates
      return { id: 'new-template-id' };
    } catch (error) {
      throw new AppError(
        'Failed to create email template',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }
}
```