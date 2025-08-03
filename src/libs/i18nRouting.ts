import { defineRouting } from 'next-intl/routing';

import { AllLocales, AppConfig } from '@/utils/AppConfig';

export const routing = defineRouting({
  locales: AllLocales,
  defaultLocale: AppConfig.defaultLocale,
  pathnames: {
    '/': '/',
    '/sign-in': '/sign-in',
    '/sign-up': '/sign-up',
    '/dashboard': '/dashboard',
    // Add other pathnames here if they need to be localized
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
