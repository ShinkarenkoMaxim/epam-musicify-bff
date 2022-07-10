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
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { GenresService } from '../services/genres.service';

@Resolver('Genre')
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @ResolveField('id')
  async id(@Parent() genre: any) {
    return genre._id;
  }

  @Query()
  async genre(@Args('id') id: string): Promise<any> {
    const genre = await this.genresService.findUnique(id);
    return genre;
  }

  @Query()
  async genres(
    @Args('paginationInput') pagination: any,
    @Args('filter') filter: any,
  ): Promise<any> {
    const genre = await this.genresService.find(pagination, filter?.genresIds);
    return genre;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createGenre(
    @Args('createGenreInput') genre: CreateGenreDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const createdGenre = await this.genresService.create(
      genre,
      authorizationHeader,
    );
    return createdGenre;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async updateGenre(
    @Args('id') id: string,
    @Args('updateGenreInput') genre: UpdateGenreDto,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.genresService.update(
      id,
      genre,
      authorizationHeader,
    );
    return operationResponse;
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteGenre(
    @Args('id') id: string,
    @Context('req') request: any,
  ): Promise<any> {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    const operationResponse = await this.genresService.delete(
      id,
      authorizationHeader,
    );
    return operationResponse;
  }
}
