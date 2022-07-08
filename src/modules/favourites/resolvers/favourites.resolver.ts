import { UseGuards } from '@nestjs/common';
import { Query, Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { FavouritesService } from '../services/favourites.service';

@Resolver()
export class FavouritesResolver {
  constructor(private favouritesService: FavouritesService) {}

  @Mutation()
  @UseGuards(AuthGuard)
  async addTrackToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.addToFavourites(
      { id, type: 'tracks' },
      authorizationHeader,
    );
    return favourites;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addBandToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.addToFavourites(
      { id, type: 'bands' },
      authorizationHeader,
    );
    return favourites;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addArtistToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.addToFavourites(
      { id, type: 'artists' },
      authorizationHeader,
    );
    return favourites;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addGenreToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.addToFavourites(
      { id, type: 'genres' },
      authorizationHeader,
    );
    return favourites;
  }

  @Query()
  @UseGuards(AuthGuard)
  async favourites(@Context('req') request: any) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.find(authorizationHeader);
    return favourites;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeTrackToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.removeFromFavourites(
      { id, type: 'tracks' },
      authorizationHeader,
    );
    return favourites;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeBandToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.removeFromFavourites(
      { id, type: 'bands' },
      authorizationHeader,
    );
    return favourites;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeArtistToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.removeFromFavourites(
      { id, type: 'artists' },
      authorizationHeader,
    );
    return favourites;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeGenreToFavourites(
    @Args('id') id: string,
    @Context('req') request: any,
  ) {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const favourites = await this.favouritesService.removeFromFavourites(
      { id, type: 'genres' },
      authorizationHeader,
    );
    return favourites;
  }
}
