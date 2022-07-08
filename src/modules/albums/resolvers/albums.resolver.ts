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
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumsService } from '../services/albums.service';

@Resolver()
export class AlbumsResolver {
  constructor(private albumsService: AlbumsService) {}

  @ResolveField()
  async id(@Parent() album: any) {
    return album._id;
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
