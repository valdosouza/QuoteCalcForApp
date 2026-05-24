import { createMocks } from 'node-mocks-http';
import nodemailer from 'nodemailer';
import handler from '../pages/api/quote';
import { buildEmailHtml, buildEmailText } from '../lib/emailTemplate';
import type { QuoteFormData } from '../lib/types';

// ─── Mock nodemailer ──────────────────────────────────────────────────────────
jest.mock('nodemailer');

const mockSendMail = jest.fn();
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: mockSendMail,
});

// ─── Fixture ──────────────────────────────────────────────────────────────────
const validPayload: QuoteFormData = {
  appType: 'both',
  objective: 'Connect homeowners with local plumbers quickly',
  problem: 'Hard to find trusted tradespeople',
  targetAudience: 'Homeowners aged 25–55',
  expectedUsers: '1000 in year 1',
  similarApps: 'TaskRabbit',
  references: '',
  detailedDescription: '',
  loginEmail: true,
  loginGoogle: false,
  loginApple: false,
  loginFacebook: false,
  passwordRecovery: true,
  userProfile: true,
  userTypes: ['Client', 'Provider'],
  featureChat: true,
  featurePushNotifications: true,
  featureGeolocation: false,
  featurePhotoUpload: false,
  featureVideoUpload: false,
  featureScheduling: true,
  featurePayments: true,
  featureSubscription: false,
  featureMarketplace: false,
  featureCart: false,
  featureRatings: true,
  featureCoupons: false,
  featureQRCode: false,
  featureMap: false,
  featureCamera: false,
  featureMicrophone: false,
  featureDashboard: true,
  featureReports: false,
  featureOffline: false,
  featureMultiLanguage: false,
  featureAI: false,
  featureStreaming: false,
  featureSocialFeed: false,
  featurePremium: false,
  hasAdminPanel: 'yes',
  hasDifferentPermissions: 'yes',
  needsOffline: 'no',
  integrationOwnAPI: false,
  integrationERP: false,
  integrationCRM: false,
  integrationPaymentGateway: true,
  integrationWhatsApp: false,
  integrationSocialMedia: false,
  integrationNotes: '',
  hasVisualIdentity: 'partial',
  needsUXUI: true,
  hasWireframes: false,
  wantsExclusiveDesign: true,
  wantsAdvancedAnimations: false,
  contentManager: 'Internal team',
  needsCMS: false,
  needsUserManagement: true,
  needsModeration: false,
  needsReportExport: false,
  needsHosting: true,
  needsDatabase: true,
  needsOngoingSupport: true,
  needsMonitoring: false,
  needsAutoBackup: false,
  needsCDN: false,
  needsAdvancedSecurity: false,
  hasDeadline: false,
  deadlineDate: '',
  isUrgent: 'no',
  priority: 'medium',
  hasLaunchEvent: false,
  launchEventDetails: '',
  projectName: 'TradesConnect',
  contactName: 'Jane Smith',
  contactEmail: 'jane@example.com',
  contactWhatsApp: '+353 87 123 4567',
};

// ─── API handler tests ────────────────────────────────────────────────────────
describe('POST /api/quote', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSendMail.mockResolvedValue({ messageId: 'test-id-123' });
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_SECURE = 'false';
    process.env.SMTP_USER = 'test@setes.ie';
    process.env.SMTP_PASS = 'secret';
    process.env.SMTP_TO = 'sales@setes.ie';
  });

  test('rejects non-POST requests with 405', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(405);
  });

  test('rejects invalid payload with 400', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { appType: 'invalid', objective: '' },
    });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toMatchObject({ error: 'Invalid form data.' });
  });

  test('sends email and returns 200 for valid payload', async () => {
    const { req, res } = createMocks({ method: 'POST', body: validPayload });
    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ success: true });
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  test('sends email to sales@setes.ie with correct subject', async () => {
    const { req, res } = createMocks({ method: 'POST', body: validPayload });
    await handler(req as any, res as any);

    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.to).toBe('sales@setes.ie');
    expect(mailOptions.subject).toContain('TradesConnect');
    expect(mailOptions.subject).toContain('both');
    expect(mailOptions.replyTo).toBe('jane@example.com');
  });

  test('creates transporter with SMTP env vars', async () => {
    const { req, res } = createMocks({ method: 'POST', body: validPayload });
    await handler(req as any, res as any);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.test.com',
      port: 587,
      secure: false,
      auth: { user: 'test@setes.ie', pass: 'secret' },
    });
  });

  test('returns 500 when sendMail throws', async () => {
    mockSendMail.mockRejectedValue(new Error('SMTP connection refused'));
    const { req, res } = createMocks({ method: 'POST', body: validPayload });
    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toMatchObject({ error: 'Failed to send email. Please try again.' });
  });
});

// ─── Email template tests ─────────────────────────────────────────────────────
describe('buildEmailHtml', () => {
  test('includes project name in header', () => {
    const html = buildEmailHtml(validPayload);
    expect(html).toContain('TradesConnect');
  });

  test('includes contact details', () => {
    const html = buildEmailHtml(validPayload);
    expect(html).toContain('jane@example.com');
    expect(html).toContain('Jane Smith');
    expect(html).toContain('+353 87 123 4567');
  });

  test('includes selected features', () => {
    const html = buildEmailHtml(validPayload);
    expect(html).toContain('Chat');
    expect(html).toContain('Push Notifications');
    expect(html).toContain('Payment Gateway');
  });

  test('omits false boolean features', () => {
    const html = buildEmailHtml({ ...validPayload, featureStreaming: false });
    const streamingRowCount = (html.match(/Streaming/g) ?? []).length;
    expect(streamingRowCount).toBe(0);
  });

  test('returns valid HTML string', () => {
    const html = buildEmailHtml(validPayload);
    expect(html).toMatch(/^<!DOCTYPE html>/);
    expect(html).toContain('</html>');
  });
});

describe('buildEmailText', () => {
  test('includes key fields in plain text', () => {
    const text = buildEmailText(validPayload);
    expect(text).toContain('TradesConnect');
    expect(text).toContain('jane@example.com');
    expect(text).toContain('both');
  });
});
