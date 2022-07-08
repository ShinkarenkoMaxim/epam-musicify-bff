import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from '../users/services/auth.service';
import { FavouritesResolver } from './resolvers/favourites.resolver';
import { FavouritesService } from './services/favourites.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [FavouritesService, FavouritesResolver, AuthService],
})
export class FavouritesModule {}
