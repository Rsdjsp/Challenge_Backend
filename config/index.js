require("dotenv").config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  db_password: process.env.DB_PASSWORD,
  db_username: process.env.DB_USERNAME,
  db_host: process.env.DD_HOST,
  db_name: process.env.DB_NAME,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_secure: process.env.EMAIL_SECURE,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  email_redirect_url:
    process.env.NODE_ENV === "dev"
      ? process.env.EMAIL_DEV_URL_REDIRECT
      : process.env.EMAIL_URL_REDIRECT,
  bucket_name: process.env.BUCKET_NAME,
};

module.exports = config;
