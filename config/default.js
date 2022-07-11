import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || process.env.HTTP_PORT,
  project: process.env.PROJECT,
  allowed_origins: process.env.ALLOWED_ORIGINS,
  sendgrid: process.env.SENGRID_API_KEY,
  verifiedSendgridEmail: process.env.VERIFIED_SENDGRID_EMAIL,
  jwtSecret: process.env.JWT_SECRET,
  jwtIssuer: process.env.JWT_ISSUER,
};

export default config;
