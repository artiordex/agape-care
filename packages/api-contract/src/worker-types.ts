export type EmailJobData = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
  logId?: string;
};

export type SmsJobData = {
  to: string;
  body: string;
  logId?: string;
};

export type NotificationJobData = {
  userId: string;
  title: string;
  body: string;
  type: 'INFO' | 'WARNING' | 'ERROR';
  logId?: string;
};

export const QUEUE_NAMES = {
  EMAIL: 'email',
  SMS: 'sms',
  NOTIFICATION: 'notification',
} as const;
