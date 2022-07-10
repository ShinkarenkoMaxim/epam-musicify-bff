import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private baseUrl = 'http://localhost:3002/v1/artists/';

  constructor(private readonly httpService: HttpService) {}

  async create(artist: CreateArtistDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .post(this.baseUrl, artist, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }

  async find(
    paginationInput?: { limit: number; offset: number },
    artistsIds?: string[],
  ) {
    let params = {};
    if (paginationInput) params = Object.assign(params, { ...paginationInput });
    if (artistsIds) params = Object.assign(params, { _id: artistsIds });

    let res = await lastValueFrom(
      this.httpService
        .get(this.baseUrl, { params })
        .pipe(map((response) => response.data)),
    );

    // Convert _id to id
    if (res) {
      res.items = res.items.map((artist) => ({ ...artist, id: artist._id }));
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

  async update(
    id: string,
    artist: UpdateArtistDto,
    authorizationHeader: string,
  ) {
    let res = await lastValueFrom(
      this.httpService
        .put(this.baseUrl + id, artist, {
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
