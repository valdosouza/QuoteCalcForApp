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

// Step 3 base (no refine - used for API schema merging)
export const step3BaseSchema = z.object({
  loginEmail: z.boolean().optional(),
  loginGoogle: z.boolean().optional(),
  loginApple: z.boolean().optional(),
  loginFacebook: z.boolean().optional(),
  passwordRecovery: z.boolean().optional(),
  userProfile: z.boolean().optional(),
  userTypes: z.array(z.string()).optional(),
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

// Step 3 with at-least-one refine (used on wizard)
export const step3Schema = step3BaseSchema.refine(
  (data) => {
    const hasBool = Object.entries(data)
      .filter(([k]) => k !== 'userTypes')
      .some(([, v]) => v === true);
    const hasUserTypes = (data.userTypes ?? []).length > 0;
    return hasBool || hasUserTypes;
  },
  { message: 'Please select at least one feature.' }
);

// Step 4
export const step4Schema = z.object({
  hasAdminPanel: z.enum(['yes', 'no', 'unsure'], { message: 'Please answer this question.' }),
  hasDifferentPermissions: z.enum(['yes', 'no', 'unsure'], { message: 'Please answer this question.' }),
  needsOffline: z.enum(['yes', 'no', 'unsure'], { message: 'Please answer this question.' }),
});

// Step 5 (optional)
export const step5Schema = z.object({
  integrationOwnAPI: z.boolean().optional(),
  integrationERP: z.boolean().optional(),
  integrationCRM: z.boolean().optional(),
  integrationPaymentGateway: z.boolean().optional(),
  integrationWhatsApp: z.boolean().optional(),
  integrationSocialMedia: z.boolean().optional(),
  integrationNotes: z.string().optional(),
});

// Step 6
export const step6Schema = z.object({
  hasVisualIdentity: z.enum(['yes', 'no', 'partial'], { message: 'Please indicate your visual identity status.' }),
  needsUXUI: z.boolean().optional(),
  hasWireframes: z.boolean().optional(),
  wantsExclusiveDesign: z.boolean().optional(),
  wantsAdvancedAnimations: z.boolean().optional(),
});

// Step 7 (optional)
export const step7Schema = z.object({
  contentManager: z.string().optional(),
  needsCMS: z.boolean().optional(),
  needsUserManagement: z.boolean().optional(),
  needsModeration: z.boolean().optional(),
  needsReportExport: z.boolean().optional(),
});

// Step 8 (optional)
export const step8Schema = z.object({
  needsHosting: z.boolean().optional(),
  needsDatabase: z.boolean().optional(),
  needsOngoingSupport: z.boolean().optional(),
  needsMonitoring: z.boolean().optional(),
  needsAutoBackup: z.boolean().optional(),
  needsCDN: z.boolean().optional(),
  needsAdvancedSecurity: z.boolean().optional(),
});

// Step 9 (optional)
export const step9Schema = z.object({
  hasDeadline: z.boolean().optional(),
  deadlineDate: z.string().optional(),
  isUrgent: z.enum(['yes', 'no', 'unsure']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  hasLaunchEvent: z.boolean().optional(),
  launchEventDetails: z.string().optional(),
});

// Step 10
export const step10Schema = z.object({
  projectName: z.string().min(1, 'Project name is required.'),
  contactName: z.string().min(2, 'Your name is required.'),
  contactEmail: z.string().email('Please enter a valid email address.'),
  contactWhatsApp: z
    .string()
    .min(7, 'Please enter a valid WhatsApp number.')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number.'),
});

// Full schema for API validation (uses base step3 - no ZodEffects)
export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3BaseSchema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema)
  .merge(step9Schema)
  .merge(step10Schema);

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
];
