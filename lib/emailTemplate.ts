import type { QuoteFormData } from './types';

const row = (label: string, value: string | boolean | undefined) => {
  if (value === undefined || value === '' || value === false) return '';
  const display = typeof value === 'boolean' ? (value ? '✓ Yes' : '') : value;
  if (!display) return '';
  return `
    <tr>
      <td style="padding:6px 16px;color:#555e6d;font-size:13px;white-space:nowrap;vertical-align:top;width:180px;">${label}</td>
      <td style="padding:6px 16px;color:#2b3344;font-size:13px;">${display}</td>
    </tr>`;
};

const section = (title: string, rows: string) => {
  const content = rows.replace(/^\s*$/gm, '').trim();
  if (!content) return '';
  return `
  <tr>
    <td colspan="2" style="padding:16px 16px 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#1a4fa0;text-transform:uppercase;border-top:1px solid #dce3ef;background:#f5f7fb;">${title}</td>
  </tr>
  ${content}`;
};

const boolChecks = (items: { label: string; value?: boolean }[]) =>
  items
    .filter((i) => i.value)
    .map((i) => i.label)
    .join(', ') || '—';

export function buildEmailHtml(data: Partial<QuoteFormData>): string {
  const appTypeMap: Record<string, string> = {
    android: 'Android',
    ios: 'iPhone (iOS)',
    both: 'Android + iOS',
    webapp: 'Web App',
  };

  const priorityMap: Record<string, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  const yesNoMap: Record<string, string> = {
    yes: 'Yes',
    no: 'No',
    unsure: 'Not sure',
  };

  const visibilityMap: Record<string, string> = {
    yes: 'Yes',
    no: 'No',
    partial: 'Partial',
  };

  const loginFeatures = boolChecks([
    { label: 'Email', value: data.loginEmail },
    { label: 'Google', value: data.loginGoogle },
    { label: 'Apple', value: data.loginApple },
    { label: 'Facebook', value: data.loginFacebook },
    { label: 'Password Recovery', value: data.passwordRecovery },
    { label: 'User Profile', value: data.userProfile },
  ]);

  const appFeatures = boolChecks([
    { label: 'Chat', value: data.featureChat },
    { label: 'Push Notifications', value: data.featurePushNotifications },
    { label: 'Geolocation/GPS', value: data.featureGeolocation },
    { label: 'Photo Upload', value: data.featurePhotoUpload },
    { label: 'Video Upload', value: data.featureVideoUpload },
    { label: 'Scheduling', value: data.featureScheduling },
    { label: 'Online Payments', value: data.featurePayments },
    { label: 'Monthly Subscription', value: data.featureSubscription },
    { label: 'Marketplace', value: data.featureMarketplace },
    { label: 'Shopping Cart', value: data.featureCart },
    { label: 'Ratings & Reviews', value: data.featureRatings },
    { label: 'Coupon System', value: data.featureCoupons },
    { label: 'QR Code', value: data.featureQRCode },
    { label: 'Map', value: data.featureMap },
    { label: 'Camera Integration', value: data.featureCamera },
    { label: 'Microphone Integration', value: data.featureMicrophone },
    { label: 'Dashboard', value: data.featureDashboard },
    { label: 'Reports', value: data.featureReports },
    { label: 'Offline Mode', value: data.featureOffline },
    { label: 'Multi-Language', value: data.featureMultiLanguage },
    { label: 'AI Integration', value: data.featureAI },
    { label: 'Streaming', value: data.featureStreaming },
    { label: 'Social Feed', value: data.featureSocialFeed },
    { label: 'Premium Area', value: data.featurePremium },
  ]);

  const integrations = boolChecks([
    { label: 'Own API', value: data.integrationOwnAPI },
    { label: 'ERP', value: data.integrationERP },
    { label: 'CRM', value: data.integrationCRM },
    { label: 'Payment Gateway', value: data.integrationPaymentGateway },
    { label: 'WhatsApp', value: data.integrationWhatsApp },
    { label: 'Social Networks', value: data.integrationSocialMedia },
  ]);

  const infrastructure = boolChecks([
    { label: 'Hosting', value: data.needsHosting },
    { label: 'Database', value: data.needsDatabase },
    { label: 'Ongoing Support', value: data.needsOngoingSupport },
    { label: 'Monitoring', value: data.needsMonitoring },
    { label: 'Auto Backup', value: data.needsAutoBackup },
    { label: 'CDN', value: data.needsCDN },
    { label: 'Advanced Security', value: data.needsAdvancedSecurity },
  ]);

  const rows = `
    ${section('CONTACT', `
      ${row('Project Name', data.projectName)}
      ${row('Contact', data.contactName)}
      ${row('Email', data.contactEmail)}
      ${row('WhatsApp', data.contactWhatsApp)}
    `)}
    ${section('STEP 1 — BASIC INFO', `
      ${row('Platform', data.appType ? appTypeMap[data.appType] : undefined)}
    `)}
    ${section('STEP 2 — APP OBJECTIVE', `
      ${row('Objective', data.objective)}
      ${row('Problem it solves', data.problem)}
      ${row('Target audience', data.targetAudience)}
      ${row('Expected users', data.expectedUsers)}
      ${row('Similar apps', data.similarApps)}
      ${row('References', data.references)}
      ${row('Detailed description', data.detailedDescription)}
    `)}
    ${section('STEP 3 — LOGIN & AUTHENTICATION', `
      ${row('Login / Auth', loginFeatures)}
    `)}
    ${section('STEP 4 — APP FEATURES', `
      ${row('Features', appFeatures)}
    `)}
    ${section('STEP 5 — OPERATIONAL COMPLEXITY', `
      ${row('Admin panel', data.hasAdminPanel ? yesNoMap[data.hasAdminPanel] : undefined)}
      ${row('Different permissions', data.hasDifferentPermissions ? yesNoMap[data.hasDifferentPermissions] : undefined)}
      ${row('Offline mode', data.needsOffline ? yesNoMap[data.needsOffline] : undefined)}
    `)}
    ${section('STEP 6 — INTEGRATIONS', `
      ${row('Integrations', integrations)}
      ${row('Notes', data.integrationNotes)}
    `)}
    ${section('STEP 7 — DESIGN & EXPERIENCE', `
      ${row('Visual identity', data.hasVisualIdentity ? visibilityMap[data.hasVisualIdentity] : undefined)}
      ${row('Needs UI/UX design', data.needsUXUI)}
      ${row('Has wireframes', data.hasWireframes)}
      ${row('Wants exclusive design', data.wantsExclusiveDesign)}
      ${row('Wants advanced animations', data.wantsAdvancedAnimations)}
    `)}
    ${section('STEP 8 — CONTENT & ADMIN', `
      ${row('Content managed by', data.contentManager)}
      ${row('Needs CMS', data.needsCMS)}
      ${row('User management', data.needsUserManagement)}
      ${row('Moderation', data.needsModeration)}
      ${row('Export reports', data.needsReportExport)}
    `)}
    ${section('STEP 9 — INFRASTRUCTURE', `
      ${row('Infrastructure', infrastructure)}
    `)}
    ${section('STEP 10 — TIMELINE', `
      ${row('Has deadline', data.hasDeadline)}
      ${row('Deadline date', data.deadlineDate)}
      ${row('Urgent', data.isUrgent ? yesNoMap[data.isUrgent] : undefined)}
      ${row('Priority', data.priority ? priorityMap[data.priority] : undefined)}
      ${row('Has launch event', data.hasLaunchEvent)}
      ${row('Launch event details', data.launchEventDetails)}
    `)}
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Quote Request</title></head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:32px auto;background:#ffffff;border-radius:12px;border:1px solid #dce3ef;overflow:hidden;box-shadow:0 4px 20px rgba(26,79,160,.1);">
    <tr>
      <td colspan="2" style="padding:28px 24px 22px;background:linear-gradient(135deg,#0f2d5c 0%,#1a4fa0 60%,#2d72d9 100%);">
        <p style="margin:0 0 6px;font-size:11px;color:rgba(255,255,255,.7);font-weight:700;letter-spacing:2px;text-transform:uppercase;">Setes — New Quote Request</p>
        <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;">${data.projectName || 'Untitled Project'}</h1>
        <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,.75);">Submitted by ${data.contactName || '—'} · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${rows}
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:20px 24px;border-top:1px solid #dce3ef;background:#f5f7fb;">
        <p style="margin:0;font-size:12px;color:#555e6d;text-align:center;">This quote request was submitted via the Setes Quote Calculator</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildEmailText(data: Partial<QuoteFormData>): string {
  return `NEW QUOTE REQUEST — ${data.projectName || 'Untitled'}
Contact: ${data.contactName} | ${data.contactEmail} | ${data.contactWhatsApp}
Platform: ${data.appType}
Objective: ${data.objective}
Submitted: ${new Date().toISOString()}
`;
}
