require('dotenv').config()

const {
  PORT,
  HOST,

  POSTGRES_USER,
  POSTGRES_PWD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,

  JWT_EXPIRATION,
  JWT_SECRET,

  CLOUDINARY_FOLDER,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
} = process.env

module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm',
      args: 'run server',
      env_production: {
        NODE_ENV: 'production',
        PORT,
        HOST,

        POSTGRES_USER,
        POSTGRES_PWD,
        POSTGRES_HOST,
        POSTGRES_PORT,
        POSTGRES_DB,

        JWT_EXPIRATION,
        JWT_SECRET,

        CLOUDINARY_FOLDER,
        CLOUDINARY_NAME,
        CLOUDINARY_API_KEY,
        CLOUDINARY_SECRET_KEY,
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
}
