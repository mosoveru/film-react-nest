import 'dotenv/config';

export default () => ({
  database: {
    url: process.env.DATABASE_URL,
    driver: process.env.DATABASE_DRIVER,
  },
});
