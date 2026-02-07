import { EmailJobData } from '@agape-care/api-contract';
import { logger } from '@agape-care/logger';
import { Job } from 'bullmq';
import nodemailer from 'nodemailer';

// SMTP 메일 전송 설정
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailProcessor = async (job: Job<EmailJobData>) => {
  logger.info(`[Email] Processing job ${job.id} to ${job.data.to}`, { category: 'SYSTEM' });

  const { to, subject, text, html } = job.data;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Agape Care" <noreply@agape-care.com>',
      to,
      subject,
      text,
      html,
    });

    logger.info(`[Email] Sent: ${info.messageId}`, { category: 'SYSTEM' });
    return info;
  } catch (error) {
    logger.error(`[Email] Failed to send email to ${to}`, { category: 'SYSTEM', error });
    throw error;
  }
};
