import { registerAs } from '@nestjs/config';

export = registerAs('config', () => ({
    port: process.env.PORT ?? 3333,
}));
