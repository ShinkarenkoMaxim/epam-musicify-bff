import { UseGuards } from '@nestjs/common';
import {
  Query,
  Args,
  Context,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { TracksService } from 'src/modules/tracks/services/tracks.services';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { FavouritesService } from '../services/favourites.service';

@Resolver('Favourites')
export class FavouritesResolver {
  constructor(
    private favouritesService: FavouritesService,
    private bandsService: BandsService,
    private genresService: GenresService,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
  ) {}

  @ResolveField('id')
  async id(@Parent() album: any) {
    return album._id;
  }

  @ResolveField('bands')
  async bands(@Parent() favourite) {
    const { bandsIds } = favourite;

    if (bandsIds.length > 0) {
      const { items } = await this.bandsService.find(null, bandsIds);
      return items;
    }

    return [];
  }

  @ResolveField('genres')
  async genres(@Parent() favourite) {
    const { genresIds } = favourite;

    if (genresIds.length > 0) {
      const { items } = await this.genresService.find(null, genresIds);
      return items;
    }

    return [];
  }

  @ResolveField('artists')
  async artists(@Parent() favourite) {
    const { artistsIds } = favourite;

    if (artistsIds.length > 0) {
      const { items } = await this.artistsService.find(null, artistsIds);
      return items;
    }

    return [];
  }

  @ResolveField('tracks')
  async tracks(@Parent() favourite) {
    const { tracksIds } = favourite;

    if (tracksIds.length > 0) {
      const { items } = await this.tracksService.find(null, tracksIds);
      return items;
    }

    return [];
  }

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
