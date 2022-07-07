import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';

@Injectable()
export class GenresService {
  private baseUrl = 'http://localhost:3001/v1/genres/';

  constructor(private readonly httpService: HttpService) {}

  async create(genre: CreateGenreDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .post(this.baseUrl, genre, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }

  async find(paginationInput?: { limit: number; offset: number }) {
    let res = await lastValueFrom(
      this.httpService
        .get(this.baseUrl, { params: { ...paginationInput } })
        .pipe(map((response) => response.data)),
    );

    // Convert _id to id
    if (res) {
      res.items = res.items.map((genre) => ({ ...genre, id: genre._id }));
    }

    return res;
  }

  async findUnique(id: string) {
    let res = await lastValueFrom(
      this.httpService
        .get(this.baseUrl + id)
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }

  async update(id: string, genre: UpdateGenreDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .put(this.baseUrl + id, genre, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }

  async delete(id: string, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .delete(this.baseUrl + id, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }
}
