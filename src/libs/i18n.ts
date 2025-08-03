import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { AllLocales, AppConfig } from '@/utils/AppConfig';

// NextJS Boilerplate uses Crowdin as the localization software.
// As a developer, you only need to take care of the English (or another default language) version.
// Other languages are automatically generated and handled by Crowdin.

// The localisation files are synced with Crowdin using GitHub Actions.
// By default, there are 3 ways to sync the message files:
// 1. Automatically sync on push to the `main` branch
// 2. Run manually the workflow on GitHub Actions
// 3. Every 24 hours at 5am, the workflow will run automatically

// Using internationalization in Server Components
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(AllLocales, requested)
    ? requested
    : AppConfig.defaultLocale;

  // Import messages based on the locale
  let messages;
  try {
    messages = (await import(`../locales/${locale}.json`)).default;
  } catch {
    // Fallback to default locale if the requested locale is not available
    messages = (await import(`../locales/en.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
