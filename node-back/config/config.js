import env from 'dotenv';
env.config();
const Env = process.env;
// console.log(Env);
export const config = {
  jwt: {
    secretKey: Env.SECRET_KEY,
    expires: Number(Env.EXPIRES) * 1000,
  },
  bcrypt: {
    salt: Env.SALT,
  },
  server: {
    port: Env.SERVER_PORT,
  },
  mysql: {
    host: Env.MYSQL_HOST,
    user: Env.MYSQL_USER,
    database: Env.MYSQL_DATABASE,
    password: Env.MYSQL_PASSWORD,
  },
  upbit: {
    accessKey: Env.UPBIT_ACCESS_KEY,
    secretKey: Env.UPBIT_SECRET_KEY,
    upbitUrl: Env.UPBIT_URL,
  },
};

export const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
};
