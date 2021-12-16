import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import githubConfig from '@shared/configs/github.config';
import { GitHubService } from './github.service';
import { GitHubController } from './v1/github.controller';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            load: [githubConfig],
        }),
    ],
    controllers: [GitHubController],
    providers: [GitHubService],
    exports: [GitHubService],
})
export class GitHubModule {}
