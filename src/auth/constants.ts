import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expireTime: process.env.TOKEN_EXPIRE_TIME,
  refreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
  refreshExpireTime: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};
