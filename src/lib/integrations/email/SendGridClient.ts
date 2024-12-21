import { MailService } from '@sendgrid/mail';

export class SendGridClient {
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
  }) {
    return this.client.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
      templateId: params.templateId,
      dynamicTemplateData: params.dynamicTemplateData
    });
  }

  async sendBulkEmails(params: {
    to: string[];
    from: string;
    subject: string;
    text?: string;
    html?: string;
    templateId?: string;
    dynamicTemplateData?: Record<string, any>;
  }) {
    const messages = params.to.map(recipient => ({
      to: recipient,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
      templateId: params.templateId,
      dynamicTemplateData: params.dynamicTemplateData
    }));

    return this.client.send(messages);
  }
}