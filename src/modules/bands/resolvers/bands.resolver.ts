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
import { AuthGuard } from '../../users/guards/auth.guard';
import { Member } from '../classes/member';
import { CreateBandDto } from '../dto/create-band.dto';
import { UpdateBandDto } from '../dto/update-band.dto';
import { BandsService } from '../services/bands.service';

@Resolver()
export class BandsResolver {
  constructor(private bandsService: BandsService) {}

  @ResolveField()
  async id(@Parent() band: any) {
    return band._id;
  }

  @Query()
  async band(@Args('id') id: string): Promise<any> {
    const band = await this.bandsService.findUnique(id);
    return band;
  }

  @Query()
  async bands(@Args('paginationInput') pagination: any): Promise<any> {
    const band = await this.bandsService.find(pagination);
    return band;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createBand(
    @Args('createBandInput') band: CreateBandDto,
    @Args('createMembersInput') members: [Member],
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const createdBand = await this.bandsService.create(
      { ...band, members },
      authorizationHeader,
    );
    return createdBand;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateBand(
    @Args('id') id: string,
    @Args('updateBandInput') band: UpdateBandDto,
    @Args('updateMembersInput') members: [Member],
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.bandsService.update(
      id,
      { ...band, members },
      authorizationHeader,
    );
    return operationResponse;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteBand(
    @Args('id') id: string,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.bandsService.delete(
      id,
      authorizationHeader,
    );
    return operationResponse;
  }
}
