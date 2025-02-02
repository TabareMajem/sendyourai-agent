import { MailService } from '@sendgrid/mail';
import type { MailDataRequired } from '@sendgrid/mail';

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
    if (!params.text && !params.html) {
      throw new Error('Either text or html content must be provided.');
    }
  
    const mailData: MailDataRequired = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      content: params.text
        ? [{ type: 'text/plain', value: params.text }]
        : [{ type: 'text/html', value: params.html! }]
    };
  
    if (params.templateId) {
      mailData.templateId = params.templateId;
      if (params.dynamicTemplateData) {
        mailData.dynamicTemplateData = params.dynamicTemplateData;
      }
    }
  
    return this.client.send(mailData);
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
    if (!params.text && !params.html) {
      throw new Error('Either text or html content must be provided.');
    }
  
    const messages: MailDataRequired[] = params.to.map((recipient) => {
      const mailData: MailDataRequired = {
        to: recipient,
        from: params.from,
        subject: params.subject,
        content: params.text
          ? [{ type: 'text/plain', value: params.text }]
          : [{ type: 'text/html', value: params.html! }]
      };
  
      if (params.templateId) {
        mailData.templateId = params.templateId;
        if (params.dynamicTemplateData) {
          mailData.dynamicTemplateData = params.dynamicTemplateData;
        }
      }
  
      return mailData;
    });
  
    return this.client.send(messages);
  }
  
}