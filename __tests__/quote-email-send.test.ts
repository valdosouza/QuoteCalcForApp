import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { buildEmailHtml, buildEmailText } from '../lib/emailTemplate';
import type { QuoteFormData } from '../lib/types';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const payload: Partial<QuoteFormData> = {
  projectName: 'Teste de Envio — QuoteCalc',
  contactName: 'Valdo (Teste)',
  contactEmail: process.env.SMTP_USER!,
  contactWhatsApp: '+55 11 99999-9999',
  appType: 'both',
  objective: 'Validar o envio de e-mail pelo QuoteCalc via SMTP real.',
  budgetRange: '15,000 to 30,000 EUR',
  hasAdminPanel: 'yes',
  featureChat: true,
  featurePayments: true,
  hasVisualIdentity: 'partial',
};

test('envia e-mail real via SMTP configurado em .env.local', async () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  expect(SMTP_HOST).toBeTruthy();
  expect(SMTP_USER).toBeTruthy();
  expect(SMTP_PASS).toBeTruthy();

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const info = await transporter.sendMail({
    from: `"QuoteCalc Teste" <${SMTP_USER}>`,
    to: SMTP_USER,
    replyTo: payload.contactEmail,
    subject: `[TESTE] Nova Cotação — ${payload.projectName}`,
    text: buildEmailText(payload),
    html: buildEmailHtml(payload),
  });

  console.log('E-mail enviado! MessageId:', info.messageId);
  expect(info.messageId).toBeTruthy();
}, 15000);
