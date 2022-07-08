import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from '../users/services/auth.service';
import { TracksResolver } from './resolvers/tracks.resolver';
import { TracksService } from './services/tracks.services';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [TracksService, TracksResolver, AuthService],
})
export class TracksModule {}
