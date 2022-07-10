import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TracksService } from '../services/tracks.services';

@Resolver('Track')
export class TracksResolver {
  constructor(
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private bandsService: BandsService,
    private genresService: GenresService,
    private albumsService: AlbumsService,
  ) {}

  @ResolveField('id')
  async id(@Parent() track: any) {
    return track._id;
  }

  @ResolveField('album')
  async album(@Parent() track) {
    const { albumId } = track;

    if (albumId) {
      const album = await this.albumsService.findUnique(albumId);
      return album;
    }

    return [];
  }

  @ResolveField('artists')
  async artists(@Parent() track) {
    const { artistsIds } = track;

    if (artistsIds.length > 0) {
      const { items } = await this.artistsService.find(null, artistsIds);
      return items;
    }

    return [];
  }

  @ResolveField('bands')
  async bands(@Parent() track) {
    const { bandsIds } = track;

    if (bandsIds.length > 0) {
      const { items } = await this.bandsService.find(null, bandsIds);
      return items;
    }

    return [];
  }

  @ResolveField('genres')
  async genres(@Parent() track) {
    const { genresIds } = track;

    if (genresIds.length > 0) {
      const { items } = await this.genresService.find(null, genresIds);
      return items;
    }

    return [];
  }

  @Query()
  async track(@Args('id') id: string): Promise<any> {
    const track = await this.tracksService.findUnique(id);
    return track;
  }

  @Query()
  async tracks(
    @Args('paginationInput') pagination: any,
    @Args('filter') filter: any,
  ): Promise<any> {
    const track = await this.tracksService.find(pagination, filter?.tracksIds);
    return track;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createTrack(
    @Args('createTrackInput') track: CreateTrackDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const createdtrack = await this.tracksService.create(
      track,
      authorizationHeader,
    );
    return createdtrack;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateTrack(
    @Args('id') id: string,
    @Args('updateTrackInput') track: UpdateTrackDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.tracksService.update(
      id,
      track,
      authorizationHeader,
    );
    return operationResponse;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteTrack(
    @Args('id') id: string,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.tracksService.delete(
      id,
      authorizationHeader,
    );
    return operationResponse;
  }
}
