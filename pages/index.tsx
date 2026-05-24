import Head from 'next/head';
import { useState, useCallback } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { QuoteFormData } from '../lib/types';
import { stepSchemas } from '../lib/schemas';
import { en } from '../locales/en';

const TOTAL_STEPS = 11;
const OPTIONAL_STEPS = new Set([6, 8, 9, 10]);

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current }: { current: number }) {
  return (
    <div className="progress-bar-wrap" role="progressbar" aria-valuenow={current} aria-valuemax={TOTAL_STEPS}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className={`progress-segment${i + 1 < current ? ' done' : i + 1 === current ? ' active' : ''}`} />
      ))}
    </div>
  );
}

// ─── Step Header ──────────────────────────────────────────────────────────────
function StepHeader({ step }: { step: number }) {
  const s = en.steps[step - 1];
  return (
    <div className="step-header">
      <div className="step-label">{s.label}</div>
      <h1 className="step-title">{s.title}</h1>
      <p className="step-description">{s.description}</p>
    </div>
  );
}

// ─── Shared checkbox item ─────────────────────────────────────────────────────
function CheckboxItem({ name, label }: { name: keyof QuoteFormData; label: string }) {
  const { register, watch } = useFormContext<QuoteFormData>();
  const checked = !!watch(name);
  return (
    <label className={`checkbox-option${checked ? ' checked' : ''}`}>
      <input type="checkbox" {...register(name as any)} />
      <span className="checkbox-label">{label}</span>
    </label>
  );
}

// ─── Shared yes/no/unsure radio row ──────────────────────────────────────────
const YES_NO_OPTS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: "I'm not sure" },
];

function YesNoRadio({ name, label }: { name: keyof QuoteFormData; label: string }) {
  const { register, watch, setValue } = useFormContext<QuoteFormData>();
  const current = watch(name) as string;
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {YES_NO_OPTS.map((opt) => (
          <label key={opt.value} className={`radio-option${current === opt.value ? ' selected' : ''}`} style={{ flex: '1 1 auto', minWidth: 100 }}>
            <input type="radio" value={opt.value} {...register(name as any)} onChange={() => setValue(name as any, opt.value as any, { shouldValidate: true })} />
            <div className="radio-label">{opt.label}</div>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1 — App Type ───────────────────────────────────────────────────────
const APP_TYPES = [
  { value: 'android', label: 'Android', desc: 'Google Play Store' },
  { value: 'ios', label: 'iPhone (iOS)', desc: 'Apple App Store' },
  { value: 'both', label: 'Android + iOS', desc: 'Both platforms — most common' },
  { value: 'webapp', label: 'Web App', desc: 'Runs in a browser on any device' },
];

function Step1() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<QuoteFormData>();
  const current = watch('appType');
  return (
    <div className="form-content">
      <div className="radio-group">
        {APP_TYPES.map((opt) => (
          <label key={opt.value} className={`radio-option${current === opt.value ? ' selected' : ''}`}>
            <input type="radio" value={opt.value} {...register('appType')} onChange={() => setValue('appType', opt.value as QuoteFormData['appType'], { shouldValidate: true })} />
            <div>
              <div className="radio-label">{opt.label}</div>
              <div className="radio-desc">{opt.desc}</div>
            </div>
          </label>
        ))}
      </div>
      {errors.appType && <p className="field-error" style={{ marginTop: 12 }}>{errors.appType.message}</p>}
    </div>
  );
}

// ─── Step 2 — App Objective ──────────────────────────────────────────────────
function Step2() {
  const { register, formState: { errors } } = useFormContext<QuoteFormData>();
  return (
    <div className="form-content">
      <div className="field-group">
        <label className="field-label">Main objective <span className="required">*</span></label>
        <input className="field-input" placeholder="e.g. Connect homeowners with local plumbers" {...register('objective')} />
        {errors.objective && <p className="field-error">{errors.objective.message}</p>}
      </div>
      <div className="field-group">
        <label className="field-label">What problem does it solve?</label>
        <input className="field-input" placeholder="e.g. It is hard to find a trusted tradesperson quickly" {...register('problem')} />
      </div>
      <div className="field-group">
        <label className="field-label">Target audience</label>
        <input className="field-input" placeholder="e.g. Homeowners aged 25-55 in Ireland" {...register('targetAudience')} />
      </div>
      <div className="field-group">
        <label className="field-label">Expected number of users</label>
        <input className="field-input" placeholder="e.g. 1,000 in year 1 then 50,000 in year 3" {...register('expectedUsers')} />
      </div>
      <div className="field-group">
        <label className="field-label">Similar apps you know of</label>
        <input className="field-input" placeholder="e.g. Airbnb, TaskRabbit, Deliveroo" {...register('similarApps')} />
      </div>
      <div className="field-group">
        <label className="field-label">References or apps you like</label>
        <input className="field-input" placeholder="Links or app names" {...register('references')} />
      </div>
      <div className="field-group">
        <label className="field-label">Describe your app in as much detail as possible</label>
        <textarea className="field-textarea" style={{ minHeight: 120 }} placeholder="Walk us through the user journey, main screens, and any unique features..." {...register('detailedDescription')} />
      </div>
    </div>
  );
}

// ─── Step 3 — Login & Authentication ────────────────────────────────────────
function Step3() {
  return (
    <div className="form-content">
      <div className="checkbox-section">
        <div className="checkbox-grid">
          <CheckboxItem name="loginEmail" label="Email and password" />
          <CheckboxItem name="loginGoogle" label="Google login" />
          <CheckboxItem name="loginApple" label="Apple login" />
          <CheckboxItem name="loginFacebook" label="Facebook login" />
          <CheckboxItem name="passwordRecovery" label="Password recovery" />
          <CheckboxItem name="userProfile" label="User profile" />
        </div>
      </div>
    </div>
  );
}

// ─── Step 4 — App Features ───────────────────────────────────────────────────
function Step4() {
  return (
    <div className="form-content">
      <div className="checkbox-section">
        <div className="checkbox-grid checkbox-grid-2col">
          <CheckboxItem name="featureChat" label="Chat" />
          <CheckboxItem name="featurePushNotifications" label="Push Notifications" />
          <CheckboxItem name="featureGeolocation" label="Geolocation / GPS" />
          <CheckboxItem name="featurePhotoUpload" label="Photo upload" />
          <CheckboxItem name="featureVideoUpload" label="Video upload" />
          <CheckboxItem name="featureScheduling" label="Scheduling" />
          <CheckboxItem name="featurePayments" label="Online payments" />
          <CheckboxItem name="featureSubscription" label="Monthly subscription" />
          <CheckboxItem name="featureMarketplace" label="Marketplace" />
          <CheckboxItem name="featureCart" label="Shopping cart" />
          <CheckboxItem name="featureRatings" label="Ratings and reviews" />
          <CheckboxItem name="featureCoupons" label="Coupon system" />
          <CheckboxItem name="featureQRCode" label="QR Code" />
          <CheckboxItem name="featureMap" label="Map" />
          <CheckboxItem name="featureCamera" label="Camera integration" />
          <CheckboxItem name="featureMicrophone" label="Microphone" />
          <CheckboxItem name="featureDashboard" label="Dashboard" />
          <CheckboxItem name="featureReports" label="Reports" />
          <CheckboxItem name="featureOffline" label="Offline mode" />
          <CheckboxItem name="featureMultiLanguage" label="Multi-language" />
          <CheckboxItem name="featureAI" label="AI integration" />
          <CheckboxItem name="featureStreaming" label="Streaming" />
          <CheckboxItem name="featureSocialFeed" label="Social feed" />
          <CheckboxItem name="featurePremium" label="Premium area" />
        </div>
      </div>
    </div>
  );
}

// ─── Step 5 — Operational Complexity ────────────────────────────────────────
function Step5() {
  const { formState: { errors } } = useFormContext<QuoteFormData>();
  return (
    <div className="form-content">
      <YesNoRadio name="hasAdminPanel" label="Will the app have an admin panel?" />
      <YesNoRadio name="hasDifferentPermissions" label="Will it have different user permissions?" />
      <YesNoRadio name="needsOffline" label="Does it need to work offline?" />
      {(errors.hasAdminPanel || errors.hasDifferentPermissions || errors.needsOffline) && (
        <p className="field-error">Please answer all questions.</p>
      )}
    </div>
  );
}

// ─── Step 6 — External Integrations (optional) ──────────────────────────────
function Step6() {
  const { register } = useFormContext<QuoteFormData>();
  return (
    <div className="form-content">
      <div className="checkbox-section">
        <div className="checkbox-section-title">Select all that apply</div>
        <div className="checkbox-grid single-col">
          <CheckboxItem name="integrationOwnAPI" label="Own API / back-end" />
          <CheckboxItem name="integrationERP" label="ERP system" />
          <CheckboxItem name="integrationCRM" label="CRM system" />
          <CheckboxItem name="integrationPaymentGateway" label="Payment gateway (Stripe, PayPal, etc.)" />
          <CheckboxItem name="integrationWhatsApp" label="WhatsApp" />
          <CheckboxItem name="integrationSocialMedia" label="Social networks" />
        </div>
      </div>
      <div className="field-group">
        <label className="field-label">Additional notes about integrations</label>
        <textarea className="field-textarea" style={{ minHeight: 80 }} placeholder="Any specific APIs or systems you need to connect to..." {...register('integrationNotes')} />
      </div>
    </div>
  );
}

// ─── Step 7 — Design and Experience ─────────────────────────────────────────
const VIS_IDENTITY_OPTS = [
  { value: 'yes', label: 'Yes', desc: 'We have logo, brand colours, and guidelines' },
  { value: 'partial', label: 'Partial', desc: 'We have some elements but need help' },
  { value: 'no', label: 'No', desc: 'We need everything designed from scratch' },
];

function Step7() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<QuoteFormData>();
  const current = watch('hasVisualIdentity');
  return (
    <div className="form-content">
      <div className="field-group">
        <label className="field-label">Do you have an existing visual identity? <span className="required">*</span></label>
        <div className="radio-group">
          {VIS_IDENTITY_OPTS.map((opt) => (
            <label key={opt.value} className={`radio-option${current === opt.value ? ' selected' : ''}`}>
              <input type="radio" value={opt.value} {...register('hasVisualIdentity')} onChange={() => setValue('hasVisualIdentity', opt.value as any, { shouldValidate: true })} />
              <div>
                <div className="radio-label">{opt.label}</div>
                <div className="radio-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.hasVisualIdentity && <p className="field-error">{errors.hasVisualIdentity.message}</p>}
      </div>
      <div className="divider" />
      <div className="checkbox-section">
        <div className="checkbox-section-title">Design preferences</div>
        <div className="checkbox-grid single-col">
          <CheckboxItem name="needsUXUI" label="We need full UI/UX design" />
          <CheckboxItem name="hasWireframes" label="We already have wireframes / mockups" />
          <CheckboxItem name="wantsExclusiveDesign" label="We want a unique, bespoke design" />
          <CheckboxItem name="wantsAdvancedAnimations" label="We want advanced animations / micro-interactions" />
        </div>
      </div>
    </div>
  );
}

// ─── Step 8 — Content and Administration (optional) ─────────────────────────
function Step8() {
  const { register } = useFormContext<QuoteFormData>();
  return (
    <div className="form-content">
      <div className="field-group">
        <label className="field-label">Who will manage the content?</label>
        <input className="field-input" placeholder="e.g. Our internal marketing team" {...register('contentManager')} />
      </div>
      <div className="checkbox-section">
        <div className="checkbox-section-title">Requirements</div>
        <div className="checkbox-grid single-col">
          <CheckboxItem name="needsCMS" label="Needs a content management system (CMS)" />
          <CheckboxItem name="needsUserManagement" label="Needs user management / admin panel" />
          <CheckboxItem name="needsModeration" label="Needs content moderation tools" />
          <CheckboxItem name="needsReportExport" label="Needs to export reports (CSV, PDF, etc.)" />
        </div>
      </div>
    </div>
  );
}

// ─── Step 9 — Infrastructure (optional) ─────────────────────────────────────
function Step9() {
  return (
    <div className="form-content">
      <div className="checkbox-section">
        <div className="checkbox-section-title">Select all that apply</div>
        <div className="checkbox-grid single-col">
          <CheckboxItem name="needsHosting" label="Hosting / cloud server" />
          <CheckboxItem name="needsDatabase" label="Database" />
          <CheckboxItem name="needsOngoingSupport" label="Ongoing technical support" />
          <CheckboxItem name="needsMonitoring" label="Performance monitoring" />
          <CheckboxItem name="needsAutoBackup" label="Automatic backup" />
          <CheckboxItem name="needsCDN" label="CDN (content delivery network)" />
          <CheckboxItem name="needsAdvancedSecurity" label="Advanced security and compliance" />
        </div>
      </div>
    </div>
  );
}

// ─── Step 10 — Timeline & Priority (optional) ────────────────────────────────
function Step10() {
  const { register, watch, setValue } = useFormContext<QuoteFormData>();
  const hasDeadline = watch('hasDeadline');
  const hasLaunchEvent = watch('hasLaunchEvent');
  const isUrgent = watch('isUrgent');
  const priority = watch('priority');
  return (
    <div className="form-content">
      <div className="field-group">
        <label className={`checkbox-option${hasDeadline ? ' checked' : ''}`} style={{ marginBottom: 8 }}>
          <input type="checkbox" {...register('hasDeadline')} />
          <span className="checkbox-label">There is a defined deadline</span>
        </label>
        {hasDeadline && <input type="date" className="field-input" {...register('deadlineDate')} />}
      </div>
      <div className="field-group">
        <label className="field-label">Is this project urgent?</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {YES_NO_OPTS.map((opt) => (
            <label key={opt.value} className={`radio-option${isUrgent === opt.value ? ' selected' : ''}`} style={{ flex: '1 1 auto', minWidth: 90 }}>
              <input type="radio" value={opt.value} {...register('isUrgent')} onChange={() => setValue('isUrgent', opt.value as any)} />
              <div className="radio-label">{opt.label}</div>
            </label>
          ))}
        </div>
      </div>
      <div className="field-group">
        <label className="field-label">Priority level</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }].map((opt) => (
            <label key={opt.value} className={`radio-option${priority === opt.value ? ' selected' : ''}`} style={{ flex: '1 1 auto', minWidth: 80 }}>
              <input type="radio" value={opt.value} {...register('priority')} onChange={() => setValue('priority', opt.value as any)} />
              <div className="radio-label">{opt.label}</div>
            </label>
          ))}
        </div>
      </div>
      <div className="field-group">
        <label className={`checkbox-option${hasLaunchEvent ? ' checked' : ''}`} style={{ marginBottom: 8 }}>
          <input type="checkbox" {...register('hasLaunchEvent')} />
          <span className="checkbox-label">There is a specific launch event or milestone</span>
        </label>
        {hasLaunchEvent && <input className="field-input" placeholder="e.g. Product launch at Web Summit, November 2025" {...register('launchEventDetails')} />}
      </div>
    </div>
  );
}

// ─── Step 11 — Contact Details ───────────────────────────────────────────────
function Step11() {
  const { register, formState: { errors } } = useFormContext<QuoteFormData>();
  return (
    <div className="form-content">
      <div className="field-group">
        <label className="field-label">Project / app name <span className="required">*</span></label>
        <input className="field-input" placeholder="e.g. TradesConnect" {...register('projectName')} />
        {errors.projectName && <p className="field-error">{errors.projectName.message}</p>}
      </div>
      <div className="field-group">
        <label className="field-label">Your full name <span className="required">*</span></label>
        <input className="field-input" placeholder="Jane Smith" {...register('contactName')} />
        {errors.contactName && <p className="field-error">{errors.contactName.message}</p>}
      </div>
      <div className="field-group">
        <label className="field-label">Email address <span className="required">*</span></label>
        <input type="email" className="field-input" placeholder="jane@example.com" {...register('contactEmail')} />
        {errors.contactEmail && <p className="field-error">{errors.contactEmail.message}</p>}
      </div>
      <div className="field-group">
        <label className="field-label">WhatsApp number <span className="required">*</span></label>
        <input type="tel" className="field-input" placeholder="+353 87 123 4567" {...register('contactWhatsApp')} />
        {errors.contactWhatsApp && <p className="field-error">{errors.contactWhatsApp.message}</p>}
      </div>
    </div>
  );
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="intro-wrapper">
      <div className="intro-inner">
        <div className="intro-logo">Setes</div>
        <div className="intro-badge">Free Quote — No Credit Card Required</div>
        <h1 className="intro-title">{en.intro.title}</h1>
        <p className="intro-description">{en.intro.description}</p>
        <div className="intro-features">
          {en.intro.features.map((f) => (
            <div key={f} className="intro-feature">
              <div className="intro-feature-dot" />
              {f}
            </div>
          ))}
        </div>
        <button className="btn-cta" onClick={onStart}>{en.intro.cta} &rarr;</button>
      </div>
    </div>
  );
}

// ─── Thank You Screen ─────────────────────────────────────────────────────────
function ThankYou() {
  return (
    <div className="thankyou-wrapper">
      <div className="thankyou-icon">&#10003;</div>
      <h1 className="thankyou-title">{en.thankyou.title}</h1>
      <p className="thankyou-subtitle">{en.thankyou.subtitle}</p>
      <p className="thankyou-body">{en.thankyou.body}</p>
      <p className="thankyou-team">{en.thankyou.team}</p>
    </div>
  );
}

// ─── Step Router ──────────────────────────────────────────────────────────────
function StepContent({ step }: { step: number }) {
  switch (step) {
    case 1: return <Step1 />;
    case 2: return <Step2 />;
    case 3: return <Step3 />;
    case 4: return <Step4 />;
    case 5: return <Step5 />;
    case 6: return <Step6 />;
    case 7: return <Step7 />;
    case 8: return <Step8 />;
    case 9: return <Step9 />;
    case 10: return <Step10 />;
    case 11: return <Step11 />;
    default: return null;
  }
}

// ─── Default form values ──────────────────────────────────────────────────────
const DEFAULT_VALUES: Partial<QuoteFormData> = {
  loginEmail: false, loginGoogle: false, loginApple: false, loginFacebook: false,
  passwordRecovery: false, userProfile: false,
  featureChat: false, featurePushNotifications: false, featureGeolocation: false,
  featurePhotoUpload: false, featureVideoUpload: false, featureScheduling: false,
  featurePayments: false, featureSubscription: false, featureMarketplace: false,
  featureCart: false, featureRatings: false, featureCoupons: false,
  featureQRCode: false, featureMap: false, featureCamera: false,
  featureMicrophone: false, featureDashboard: false, featureReports: false,
  featureOffline: false, featureMultiLanguage: false, featureAI: false,
  featureStreaming: false, featureSocialFeed: false, featurePremium: false,
  integrationOwnAPI: false, integrationERP: false, integrationCRM: false,
  integrationPaymentGateway: false, integrationWhatsApp: false, integrationSocialMedia: false,
  needsUXUI: false, hasWireframes: false, wantsExclusiveDesign: false, wantsAdvancedAnimations: false,
  needsCMS: false, needsUserManagement: false, needsModeration: false, needsReportExport: false,
  needsHosting: false, needsDatabase: false, needsOngoingSupport: false,
  needsMonitoring: false, needsAutoBackup: false, needsCDN: false, needsAdvancedSecurity: false,
  hasDeadline: false, hasLaunchEvent: false,
  integrationNotes: '', contentManager: '', deadlineDate: '', launchEventDetails: '',
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function QuoteWizard() {
  const [phase, setPhase] = useState<'intro' | 'form' | 'done'>('intro');
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = stepSchemas[step - 1];

  const methods = useForm<QuoteFormData>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES as QuoteFormData,
  });

  const handleNext = useCallback(async () => {
    const allValues = methods.getValues();
    const parsed = schema.safeParse(allValues);

    if (!parsed.success) {
      const errs = parsed.error.flatten().fieldErrors;
      Object.entries(errs).forEach(([field, msgs]) => {
        methods.setError(field as any, { message: (msgs as string[])[0] });
      });
      return;
    }

    // clear errors on valid step
    methods.clearErrors();

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(allValues),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error ?? 'Submission failed. Please try again.');
        }
        setPhase('done');
      } catch (err: any) {
        setSubmitError(err.message);
      } finally {
        setSubmitting(false);
      }
    }
  }, [step, schema, methods]);

  const handleBack = useCallback(() => {
    methods.clearErrors();
    if (step > 1) setStep((s) => s - 1);
    else setPhase('intro');
  }, [step, methods]);

  const handleSkip = useCallback(() => {
    methods.clearErrors();
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }, [step, methods]);

  const isLastStep = step === TOTAL_STEPS;
  const isOptional = OPTIONAL_STEPS.has(step);

  return (
    <>
      <Head>
        <title>App Quote Calculator — Setes</title>
        <meta name="description" content="Get a free, no-obligation quote for your mobile app development project." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-bg">
        <div className="wizard-card">
          {phase === 'intro' && <Intro onStart={() => setPhase('form')} />}

          {phase === 'form' && (
            <FormProvider {...methods}>
              <ProgressBar current={step} />
              <StepHeader step={step} />
              <StepContent step={step} />

              {isOptional && (
                <button type="button" className="skip-link" onClick={handleSkip}>
                  Skip this step &rarr;
                </button>
              )}

              {submitError && (
                <div style={{ padding: '0 28px' }}>
                  <div className="alert-error">{submitError}</div>
                </div>
              )}

              <div className={`nav-footer${isLastStep ? ' single' : ''}`}>
                {!isLastStep && (
                  <button type="button" className="btn btn-secondary" onClick={handleBack}>
                    &larr; {en.nav.back}
                  </button>
                )}
                {isLastStep ? (
                  <button type="button" className="btn btn-primary" onClick={handleNext} disabled={submitting}>
                    {submitting ? 'Sending...' : en.nav.submit + ' →'}
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    {en.nav.continue} &rarr;
                  </button>
                )}
              </div>
            </FormProvider>
          )}

          {phase === 'done' && <ThankYou />}
        </div>
      </div>
    </>
  );
}
