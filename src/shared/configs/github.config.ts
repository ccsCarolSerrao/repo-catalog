import { registerAs } from '@nestjs/config';

export = registerAs('github', () => ({
    auth: process.env.GITHUB_AUTH ?? '',
    userAgent: process.env.GITHUB_USER_AGENT ?? '',
    org: process.env.GITHUB_ORG ?? '',
    pageSize: Number(process.env.GITHUB_PAGE_SIZE ?? ''),
}));
