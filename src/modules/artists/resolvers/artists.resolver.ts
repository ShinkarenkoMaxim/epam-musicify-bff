import { Res, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { AuthGuard } from '../../users/guards/auth.guard';
import { ArtistsService } from '../services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private artistsService: ArtistsService,
    private bandsService: BandsService,
  ) {}

  @ResolveField('id')
  async id(@Parent() artist: any) {
    return artist._id;
  }

  @ResolveField('bands')
  async bands(@Parent() artist) {
    const { bandsIds } = artist;

    if (bandsIds.length > 0) {
      const { items } = await this.bandsService.find(null, bandsIds);
      return items;
    }

    return [];
  }

  @Query()
  async artist(@Args('id') id: string): Promise<any> {
    const artist = await this.artistsService.findUnique(id);
    return artist;
  }

  @Query()
  async artists(
    @Args('paginationInput') pagination: any,
    @Args('filter') filter: any,
  ): Promise<any> {
    const artist = await this.artistsService.find(
      pagination,
      filter?.artistsIds,
    );
    return artist;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createArtist(
    @Args('createArtistInput') artist: CreateArtistDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const createdArtist = await this.artistsService.create(
      artist,
      authorizationHeader,
    );
    return createdArtist;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateArtist(
    @Args('id') id: string,
    @Args('updateArtistInput') artist: UpdateArtistDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.artistsService.update(
      id,
      artist,
      authorizationHeader,
    );
    return operationResponse;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteArtist(
    @Args('id') id: string,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.artistsService.delete(
      id,
      authorizationHeader,
    );
    return operationResponse;
  }
}
