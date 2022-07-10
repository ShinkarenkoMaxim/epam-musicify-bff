import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksService {
  private baseUrl = 'http://localhost:3006/v1/tracks/';

  constructor(private readonly httpService: HttpService) {}

  async create(track: CreateTrackDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .post(this.baseUrl, track, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }

  async find(
    paginationInput?: { limit: number; offset: number },
    tracksIds?: string[],
  ) {
    let params = {};
    if (paginationInput) params = Object.assign(params, { ...paginationInput });
    if (tracksIds) params = Object.assign(params, { _id: tracksIds });

    let res = await lastValueFrom(
      this.httpService
        .get(this.baseUrl, { params })
        .pipe(map((response) => response.data)),
    );

    // Convert _id to id
    if (res) {
      res.items = res.items.map((track) => ({ ...track, id: track._id }));
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

  async update(id: string, track: UpdateTrackDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .put(this.baseUrl + id, track, {
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
