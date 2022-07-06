import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { ArtistsService } from './services/artists.service';
import { AuthService } from '../users/services/auth.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ArtistsService, ArtistsResolver, AuthService],
})
export class ArtistsModule {}
