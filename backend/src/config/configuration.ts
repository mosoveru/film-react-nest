import 'dotenv/config';

export default () => ({
  database: {
    driver: process.env.DATABASE_DRIVER,
    host: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  },
});
