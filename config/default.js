import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || process.env.HTTP_PORT,
  project: process.env.PROJECT,
};

export default config;
