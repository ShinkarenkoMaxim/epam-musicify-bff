import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BandsResolver } from './resolvers/bands.resolver';
import { BandsService } from './services/bands.service';
import { AuthService } from '../users/services/auth.service';
import { GenresService } from '../genres/services/genres.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [BandsService, BandsResolver, AuthService, GenresService],
})
export class BandsModule {}
