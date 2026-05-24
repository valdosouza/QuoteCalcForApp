export const en = {
  intro: {
    badge: 'Free Quote · No Credit Card Required',
    title: 'Get an Accurate Quote for Your Mobile App',
    description:
      'Answer a few guided questions about your project and we\'ll send you a detailed, no-obligation quote within 24 hours. No credit card required. No strings attached.',
    cta: 'Start My Quote',
    features: [
      '11 steps or less to complete',
      'Personalised quote by email',
      'No commitment required',
    ],
  },
  progress: {
    stepOf: (current: number, total: number) => `STEP ${current} OF ${total}`,
  },
  steps: [
    // Step 1
    {
      label: 'STEP 1 OF 11',
      title: 'What type of app do you need?',
      description: 'Choose the platform(s) you want your application to run on.',
    },
    // Step 2
    {
      label: 'STEP 2 OF 11',
      title: 'What is your app\'s objective?',
      description: 'Help us understand the problem your app solves and who it\'s for.',
    },
    // Step 3
    {
      label: 'STEP 3 OF 11',
      title: 'Core Features',
      description: 'Select all the features you\'d like your application to include.',
    },
    // Step 4
    {
      label: 'STEP 4 OF 11',
      title: 'Operational Complexity',
      description: 'These questions help us measure the true scope of your project.',
    },
    // Step 5
    {
      label: 'STEP 5 OF 11',
      title: 'External Integrations',
      description: 'Does your app need to connect with any existing systems or services? You may skip this step.',
    },
    // Step 6
    {
      label: 'STEP 6 OF 11',
      title: 'Design & Experience',
      description: 'Tell us about the visual and UX requirements for your project.',
    },
    // Step 7
    {
      label: 'STEP 7 OF 11',
      title: 'Content & Administration',
      description: 'Tell us about content management needs. You may skip this step.',
    },
    // Step 8
    {
      label: 'STEP 8 OF 11',
      title: 'Infrastructure',
      description: 'Let us know about hosting and technical infrastructure needs. You may skip this step.',
    },
    // Step 9
    {
      label: 'STEP 9 OF 11',
      title: 'Timeline & Priority',
      description: 'Share any deadlines or urgency around your project. You may skip this step.',
    },
    // Step 10
    {
      label: 'STEP 10 OF 11',
      title: 'Budget Range',
      description: 'Select the budget range that best fits your project. This helps us tailor our proposal.',
    },
    // Step 11
    {
      label: 'STEP 11 OF 11',
      title: 'Your Contact Details',
      description: 'We\'ll send your personalised quote to the email address below.',
    },
  ],
  nav: {
    back: 'Back',
    continue: 'Continue',
    submit: 'Get My Quote',
    skip: 'Skip this step',
  },
  thankyou: {
    title: 'Thank You!',
    subtitle: 'Your quote request has been received.',
    body: 'We\'ll review your project details and get back to you within 24 hours with a personalised, no-obligation quote. Keep an eye on your inbox!',
    team: '— The Setes Team',
  },
};

export type Locale = typeof en;
