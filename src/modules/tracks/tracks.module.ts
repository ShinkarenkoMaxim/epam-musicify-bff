import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AlbumsService } from '../albums/services/albums.service';
import { ArtistsService } from '../artists/services/artists.service';
import { BandsService } from '../bands/services/bands.service';
import { GenresService } from '../genres/services/genres.service';
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
  providers: [
    TracksService,
    TracksResolver,
    AuthService,
    ArtistsService,
    BandsService,
    GenresService,
    AlbumsService,
  ],
})
export class TracksModule {}
