module.exports = {
  DB: {
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  PORT: process.env.PORT || 3000
};