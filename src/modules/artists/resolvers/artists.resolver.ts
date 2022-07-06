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
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { AuthGuard } from '../../users/guards/auth.guard';
import { ArtistsService } from '../services/artists.service';

@Resolver()
export class ArtistsResolver {
  constructor(private artistsService: ArtistsService) {}

  @ResolveField()
  async id(@Parent() artist: any) {
    return artist._id;
  }

  @Query()
  async artist(@Args('id') id: string): Promise<any> {
    const artist = await this.artistsService.findUnique(id);
    return artist;
  }

  @Query()
  async artists(@Args('paginationInput') pagination: any): Promise<any> {
    const artist = await this.artistsService.find(pagination);
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
