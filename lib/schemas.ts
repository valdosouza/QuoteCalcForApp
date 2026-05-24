import { z } from 'zod';

// Step 1
export const step1Schema = z.object({
  appType: z.enum(['android', 'ios', 'both', 'webapp'], {
    message: 'Please select a platform type.',
  }),
});

// Step 2
export const step2Schema = z.object({
  objective: z.string().min(10, 'Please describe your objective (min 10 characters).'),
  problem: z.string().optional(),
  targetAudience: z.string().optional(),
  expectedUsers: z.string().optional(),
  similarApps: z.string().optional(),
  references: z.string().optional(),
  detailedDescription: z.string().optional(),
});

// Step 3 — Login & Authentication (base, no refine — for API schema merging)
export const step3BaseSchema = z.object({
  loginEmail: z.boolean().optional(),
  loginGoogle: z.boolean().optional(),
  loginApple: z.boolean().optional(),
  loginFacebook: z.boolean().optional(),
  passwordRecovery: z.boolean().optional(),
  userProfile: z.boolean().optional(),
});

// Step 3 with at-least-one refine (used on wizard)
export const step3Schema = step3BaseSchema.refine(
  (data) => Object.values(data).some((v) => v === true),
  { message: 'Please select at least one login option.' }
);

// Step 4 — App Features (base, no refine — for API schema merging)
export const step4BaseSchema = z.object({
  featureChat: z.boolean().optional(),
  featurePushNotifications: z.boolean().optional(),
  featureGeolocation: z.boolean().optional(),
  featurePhotoUpload: z.boolean().optional(),
  featureVideoUpload: z.boolean().optional(),
  featureScheduling: z.boolean().optional(),
  featurePayments: z.boolean().optional(),
  featureSubscription: z.boolean().optional(),
  featureMarketplace: z.boolean().optional(),
  featureCart: z.boolean().optional(),
  featureRatings: z.boolean().optional(),
  featureCoupons: z.boolean().optional(),
  featureQRCode: z.boolean().optional(),
  featureMap: z.boolean().optional(),
  featureCamera: z.boolean().optional(),
  featureMicrophone: z.boolean().optional(),
  featureDashboard: z.boolean().optional(),
  featureReports: z.boolean().optional(),
  featureOffline: z.boolean().optional(),
  featureMultiLanguage: z.boolean().optional(),
  featureAI: z.boolean().optional(),
  featureStreaming: z.boolean().optional(),
  featureSocialFeed: z.boolean().optional(),
  featurePremium: z.boolean().optional(),
});

// Step 4 with at-least-one refine (used on wizard)
export const step4Schema = step4BaseSchema.refine(
  (data) => Object.values(data).some((v) => v === true),
  { message: 'Please select at least one feature.' }
);

// Step 5 — Operational Complexity
export const step5Schema = z.object({
  hasAdminPanel: z.enum(['yes', 'no', 'unsure'], { message: 'Please answer this question.' }),
  hasDifferentPermissions: z.enum(['yes', 'no', 'unsure'], { message: 'Please answer this question.' }),
  needsOffline: z.enum(['yes', 'no', 'unsure'], { message: 'Please answer this question.' }),
});

// Step 6 — External Integrations (optional)
export const step6Schema = z.object({
  integrationOwnAPI: z.boolean().optional(),
  integrationERP: z.boolean().optional(),
  integrationCRM: z.boolean().optional(),
  integrationPaymentGateway: z.boolean().optional(),
  integrationWhatsApp: z.boolean().optional(),
  integrationSocialMedia: z.boolean().optional(),
  integrationNotes: z.string().optional(),
});

// Step 7 — Design & Experience
export const step7Schema = z.object({
  hasVisualIdentity: z.enum(['yes', 'no', 'partial'], { message: 'Please indicate your visual identity status.' }),
  needsUXUI: z.boolean().optional(),
  hasWireframes: z.boolean().optional(),
  wantsExclusiveDesign: z.boolean().optional(),
  wantsAdvancedAnimations: z.boolean().optional(),
});

// Step 8 — Content & Administration (optional)
export const step8Schema = z.object({
  contentManager: z.string().optional(),
  needsCMS: z.boolean().optional(),
  needsUserManagement: z.boolean().optional(),
  needsModeration: z.boolean().optional(),
  needsReportExport: z.boolean().optional(),
});

// Step 9 — Infrastructure (optional)
export const step9Schema = z.object({
  needsHosting: z.boolean().optional(),
  needsDatabase: z.boolean().optional(),
  needsOngoingSupport: z.boolean().optional(),
  needsMonitoring: z.boolean().optional(),
  needsAutoBackup: z.boolean().optional(),
  needsCDN: z.boolean().optional(),
  needsAdvancedSecurity: z.boolean().optional(),
});

// Step 10 — Timeline & Priority (optional)
export const step10Schema = z.object({
  hasDeadline: z.boolean().optional(),
  deadlineDate: z.string().optional(),
  isUrgent: z.enum(['yes', 'no', 'unsure']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  hasLaunchEvent: z.boolean().optional(),
  launchEventDetails: z.string().optional(),
});

// Step 11 — Contact Details
export const step11Schema = z.object({
  projectName: z.string().min(1, 'Project name is required.'),
  contactName: z.string().min(2, 'Your name is required.'),
  contactEmail: z.string().email('Please enter a valid email address.'),
  contactWhatsApp: z
    .string()
    .min(7, 'Please enter a valid WhatsApp number.')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number.'),
});

// Full schema for API validation (uses base schemas — no ZodEffects)
export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3BaseSchema)
  .merge(step4BaseSchema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema)
  .merge(step9Schema)
  .merge(step10Schema)
  .merge(step11Schema);

// Per-step schemas for the wizard (index 0 = step 1)
export const stepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
  step9Schema,
  step10Schema,
  step11Schema,
];
