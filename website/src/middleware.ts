import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname === '/services/health-checks' || context.url.pathname === '/services/health-checks/') {
    return context.redirect('/health-checks', 301);
  }

  return next();
});
