const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

module.exports = (env) => {
  const envPath = `.env${env.production ? '.production' : '.development'}`;
  const fileEnv = dotenv.parse(
    fs.readFileSync(path.resolve(__dirname, '../' + envPath))
  );

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    plugins: [new DefinePlugin(envKeys)],
  };
};
