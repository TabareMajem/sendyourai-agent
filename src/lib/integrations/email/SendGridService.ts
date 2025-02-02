import { MailService } from '@sendgrid/mail';
import { AppError, ErrorCodes } from '../../utils/errors';
import { MailDataRequired } from '@sendgrid/mail';

type MailContent = {
  type: 'text/plain' | 'text/html';
  value: string;
};

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
        text: params.text ?? '',
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
      const messages = params.to.map((recipient): MailDataRequired => {
        let content: MailContent[] = [];

        if (params.templateId) {
          // For template-based emails, ensure at least one content item
          content = [{
            type: 'text/plain',
            value: params.text || ' '
          }] as [MailContent, ...MailContent[]];

          return {
            to: recipient,
            from: params.from,
            subject: params.subject,
            templateId: params.templateId,
            dynamicTemplateData: params.dynamicTemplateData,
            content
          } as MailDataRequired;
        } else {
          // For regular emails, build content array
          if (params.text) {
            content.push({
              type: 'text/plain',
              value: params.text
            });
          }

          if (params.html) {
            content.push({
              type: 'text/html',
              value: params.html
            });
          }

          // Ensure at least one content item exists
          if (content.length === 0) {
            content = [{
              type: 'text/plain',
              value: ' '
            }] as [MailContent, ...MailContent[]];
          }

          return {
            to: recipient,
            from: params.from,
            subject: params.subject,
            content: content as [MailContent, ...MailContent[]]
          } as MailDataRequired;
        }
      });

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

  async createEmailTemplate(): Promise<any> {
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