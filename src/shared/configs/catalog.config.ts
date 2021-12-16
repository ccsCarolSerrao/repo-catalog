import { registerAs } from '@nestjs/config';

export = registerAs('catalog', () => ({
    branchName: 'feat/catalog-info',
    baseBranchName: 'main',
    path: 'catalog-info.yml',
    commitMessage: 'feat: add catalog-info.yml file',
    pullRequestTitle: 'feat/catalog-info',
    pullRequestBody: 'Add catalog-info.yml file',
    pullRequestDraft: true,
}));
