const env = {
  NODE_ENV: process.env.NODE_ENV,
  APP_ENV: process.env.REACT_APP_ENV,

  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  WS_URL: process.env.REACT_APP_WS_URL,

  ENABLE_LOG: process.env.REACT_APP_ENABLE_LOG === 'true',
};

export default env;
