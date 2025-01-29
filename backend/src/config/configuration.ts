import 'dotenv/config';

export default () => ({
  database: {
    url: process.env.DATABASE_URL,
    driver: process.env.DATABASE_DRIVER,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});
