import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { AddToFavouritesDto } from '../dto/add-to-favourites.dto';
import { RemoveFromFavouritesDto } from '../dto/remove-from-favourites.dto';

@Injectable()
export class FavouritesService {
  private baseUrl = 'http://localhost:3007/v1/favourites/';

  constructor(private readonly httpService: HttpService) {}

  async addToFavourites(favs: AddToFavouritesDto, authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .put(this.baseUrl + 'add', favs, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }

  async find(authorizationHeader: string) {
    let res = await lastValueFrom(
      this.httpService
        .get(this.baseUrl, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }

  async removeFromFavourites(
    favs: RemoveFromFavouritesDto,
    authorizationHeader: string,
  ) {
    let res = await lastValueFrom(
      this.httpService
        .put(this.baseUrl + 'remove', favs, {
          headers: { authorization: authorizationHeader },
        })
        .pipe(map((response) => response.data)),
    );

    if (res && '_id' in res) res.id = res._id;

    return res;
  }
}
