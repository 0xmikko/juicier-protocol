export const isDev = process.env.NODE_ENV === 'development';

export const DEPLOYED_CONTRACT_ADDRESS = '0x0';

export const MARKETING_ADDR = isDev ? 'http://localhost:8000' : 'https://marketing.juicer.finance';
export const SERVER_ADDR = isDev ? "http://localhost:4000" : "https://juicer.finance";

export const GA_TRACKING_ID = 'UA-178882519-1';
export const FB_PIXEL = '297559898107412'; //"1039111996558849";
