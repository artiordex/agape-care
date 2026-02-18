/**
 * Description : worker-types.ts - ?? worker-types ?? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

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

export type InquiryJobData = {
  inquiryId: string;
  type: 'ADMISSION' | 'VISIT';
  name: string;
  phone: string;
  content?: string;
  visitDate?: string;
  visitTime?: string;
  logId?: string;
};

export const QUEUE_NAMES = {
  EMAIL: 'email',
  SMS: 'sms',
  NOTIFICATION: 'notification',
  INQUIRY: 'inquiry',
} as const;
