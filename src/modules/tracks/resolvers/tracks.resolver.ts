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
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TracksService } from '../services/tracks.services';

@Resolver()
export class TracksResolver {
  constructor(private tracksService: TracksService) {}

  @ResolveField()
  async id(@Parent() track: any) {
    return track._id;
  }

  @Query()
  async track(@Args('id') id: string): Promise<any> {
    const track = await this.tracksService.findUnique(id);
    return track;
  }

  @Query()
  async tracks(@Args('paginationInput') pagination: any): Promise<any> {
    const track = await this.tracksService.find(pagination);
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
