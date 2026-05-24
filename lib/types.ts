export interface QuoteFormData {
  // Step 1 – Basic Info
  appType: 'android' | 'ios' | 'both' | 'webapp';

  // Step 2 – App Objective
  objective: string;
  problem: string;
  targetAudience: string;
  expectedUsers: string;
  similarApps: string;
  references: string;
  detailedDescription: string;

  // Step 3 – Core Features
  loginEmail: boolean;
  loginGoogle: boolean;
  loginApple: boolean;
  loginFacebook: boolean;
  passwordRecovery: boolean;
  userProfile: boolean;
  userTypes: string[]; // ['client','provider','admin']
  featureChat: boolean;
  featurePushNotifications: boolean;
  featureGeolocation: boolean;
  featurePhotoUpload: boolean;
  featureVideoUpload: boolean;
  featureScheduling: boolean;
  featurePayments: boolean;
  featureSubscription: boolean;
  featureMarketplace: boolean;
  featureCart: boolean;
  featureRatings: boolean;
  featureCoupons: boolean;
  featureQRCode: boolean;
  featureMap: boolean;
  featureCamera: boolean;
  featureMicrophone: boolean;
  featureDashboard: boolean;
  featureReports: boolean;
  featureOffline: boolean;
  featureMultiLanguage: boolean;
  featureAI: boolean;
  featureStreaming: boolean;
  featureSocialFeed: boolean;
  featurePremium: boolean;

  // Step 4 – Operational Complexity
  hasAdminPanel: 'yes' | 'no' | 'unsure';
  hasDifferentPermissions: 'yes' | 'no' | 'unsure';
  needsOffline: 'yes' | 'no' | 'unsure';

  // Step 5 – External Integrations (optional)
  integrationOwnAPI: boolean;
  integrationERP: boolean;
  integrationCRM: boolean;
  integrationPaymentGateway: boolean;
  integrationWhatsApp: boolean;
  integrationSocialMedia: boolean;
  integrationNotes: string;

  // Step 6 – Design & Experience
  hasVisualIdentity: 'yes' | 'no' | 'partial';
  needsUXUI: boolean;
  hasWireframes: boolean;
  wantsExclusiveDesign: boolean;
  wantsAdvancedAnimations: boolean;

  // Step 7 – Content & Administration (optional)
  contentManager: string;
  needsCMS: boolean;
  needsUserManagement: boolean;
  needsModeration: boolean;
  needsReportExport: boolean;

  // Step 8 – Infrastructure (optional)
  needsHosting: boolean;
  needsDatabase: boolean;
  needsOngoingSupport: boolean;
  needsMonitoring: boolean;
  needsAutoBackup: boolean;
  needsCDN: boolean;
  needsAdvancedSecurity: boolean;

  // Step 9 – Timeline (optional)
  hasDeadline: boolean;
  deadlineDate: string;
  isUrgent: 'yes' | 'no' | 'unsure';
  priority: 'low' | 'medium' | 'high';
  hasLaunchEvent: boolean;
  launchEventDetails: string;

  // Step 10 – Contact
  projectName: string;
  contactName: string;
  contactEmail: string;
  contactWhatsApp: string;
}
