import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArtistsService } from '../artists/services/artists.service';
import { BandsService } from '../bands/services/bands.service';
import { GenresService } from '../genres/services/genres.service';
import { TracksService } from '../tracks/services/tracks.services';
import { AuthService } from '../users/services/auth.service';
import { AlbumsResolver } from './resolvers/albums.resolver';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    AlbumsService,
    AlbumsResolver,
    AuthService,
    ArtistsService,
    BandsService,
    TracksService,
    GenresService,
  ],
})
export class AlbumsModule {}
