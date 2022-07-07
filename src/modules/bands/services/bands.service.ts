import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CreateBandDto } from '../dto/create-band.dto';
import { UpdateBandDto } from '../dto/update-band.dto';

@Injectable()
export class BandsService {
  private baseUrl = 'http://localhost:3003/v1/bands/';

  constructor(private readonly httpService: HttpService) {}

  async create(band: CreateBandDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .post(this.baseUrl, band, {
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

    if (res) res.items = res.items.map((band) => ({ ...band, id: band._id })); // Convert _id to id

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

  async update(id: string, band: UpdateBandDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .put(this.baseUrl + id, band, {
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
