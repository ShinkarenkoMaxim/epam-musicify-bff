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
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { TracksService } from 'src/modules/tracks/services/tracks.services';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumsService } from '../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private bandsService: BandsService,
    private tracksService: TracksService,
    private genresService: GenresService,
  ) {}

  @ResolveField('id')
  async id(@Parent() album: any) {
    return album._id;
  }

  @ResolveField('artists')
  async artists(@Parent() album) {
    const { artistsIds } = album;

    if (artistsIds.length > 0) {
      const { items } = await this.artistsService.find(null, artistsIds);
      return items;
    }

    return [];
  }

  @ResolveField('bands')
  async bands(@Parent() album) {
    const { bandsIds } = album;

    if (bandsIds.length > 0) {
      const { items } = await this.bandsService.find(null, bandsIds);
      return items;
    }

    return [];
  }

  @ResolveField('tracks')
  async tracks(@Parent() album) {
    const { trackIds } = album;

    if (trackIds.length > 0) {
      const { items } = await this.tracksService.find(null, trackIds);
      return items;
    }

    return [];
  }

  @ResolveField('genres')
  async genres(@Parent() album) {
    const { genresIds } = album;

    if (genresIds.length > 0) {
      const { items } = await this.genresService.find(null, genresIds);
      return items;
    }

    return [];
  }

  @Query()
  async album(@Args('id') id: string): Promise<any> {
    const album = await this.albumsService.findUnique(id);
    return album;
  }

  @Query()
  async albums(@Args('paginationInput') pagination: any): Promise<any> {
    const album = await this.albumsService.find(pagination);
    return album;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createAlbum(
    @Args('createAlbumInput') album: CreateAlbumDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const createdAlbum = await this.albumsService.create(
      album,
      authorizationHeader,
    );
    return createdAlbum;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateAlbum(
    @Args('id') id: string,
    @Args('updateAlbumInput') album: UpdateAlbumDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.albumsService.update(
      id,
      album,
      authorizationHeader,
    );
    return operationResponse;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteAlbum(
    @Args('id') id: string,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.albumsService.delete(
      id,
      authorizationHeader,
    );
    return operationResponse;
  }
}
