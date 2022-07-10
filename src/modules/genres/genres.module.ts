import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GenresResolver } from './resolvers/genres.resolver';
import { GenresService } from './services/genres.service';
import { AuthService } from '../users/services/auth.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [GenresService, GenresResolver, AuthService],
})
export class GenresModule {}
