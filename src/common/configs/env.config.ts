import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [
    process.env.NODE_ENV === 'development' ? '.env.development' : '.env.test',
  ],
  // ignoreEnvFile: process.env.NODE_ENV === 'test',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'test').required(),
    SERVER_PORT: Joi.number().required(),
  }),
};
