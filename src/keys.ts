import 'dotenv/config';


export const dbKeys = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const jwtConstants = {
  secret: 'afa943ty9t3',
  expiresIn: `${60 * 60 * 6}s`,
};

export const { PORT } = process.env;