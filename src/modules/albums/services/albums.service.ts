import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private baseUrl = 'http://localhost:3005/v1/albums/';

  constructor(private readonly httpService: HttpService) {}

  async create(artist: CreateAlbumDto, authorizationHeader: string) {
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

  async find(paginationInput?: { limit: number; offset: number }) {
    let res = await lastValueFrom(
      this.httpService
        .get(this.baseUrl, { params: { ...paginationInput } })
        .pipe(map((response) => response.data)),
    );

    // Convert _id to id
    if (res) {
      res.items = res.items.map((album) => ({ ...album, id: album._id }));
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

  async update(id: string, album: UpdateAlbumDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .put(this.baseUrl + id, album, {
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
