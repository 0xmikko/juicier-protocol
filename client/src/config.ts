export const isDev = process.env.NODE_ENV === 'development';

export const GANACHE_NETWORK_ID = 5777;
export const KOVAN_NETWORK_ID = 42;
export const REQUIRED_NETWORK = GANACHE_NETWORK_ID

export const BACKEND_ADDR = isDev
  ? 'http://localhost:8000'
  : 'https://juicer.finance';

export const GA_TRACKER = 'UA-178882519-1';
export const FB_PIXEL = '297559898107412'; //"1039111996558849";
export const SENTRY_DSN = 'https://cd19416ad99349d0bc8df4b50b374d4e@sentry.io/3026714';
