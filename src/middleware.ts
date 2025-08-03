import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './libs/i18nRouting';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/organization-profile(.*)',
  '/user-profile(.*)',
  '/onboarding(.*)',
]);

const isClerkRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/verify(.*)',
  '/reset-password(.*)',
  '/api/clerk(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // If it's a Clerk route, let Clerk handle it directly
  if (isClerkRoute(req)) {
    return;
  }

  // For protected routes, check authentication first
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Apply next-intl middleware for all other routes
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
