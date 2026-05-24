import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { fullSchema } from '../../lib/schemas';
import { buildEmailHtml, buildEmailText } from '../../lib/emailTemplate';
import type { QuoteFormData } from '../../lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Validate payload with Zod
  const parse = fullSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid form data.', details: parse.error.flatten() });
  }

  const data = parse.data as QuoteFormData;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Setes Quote Calculator" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO ?? process.env.SMTP_USER,
      replyTo: data.contactEmail,
      subject: `New Quote Request — ${data.projectName} (${data.appType})`,
      text: buildEmailText(data),
      html: buildEmailHtml(data),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[quote API] sendMail error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
