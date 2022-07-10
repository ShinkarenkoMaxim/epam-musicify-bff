import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:3004/v1/users/';

  constructor(private readonly httpService: HttpService) {}

  async verify(jwtTokenHeader: string) {
    return lastValueFrom(
      this.httpService
        .post(this.baseUrl + 'verify', null, {
          headers: { authorization: jwtTokenHeader },
        })
        .pipe(map((response) => response.data)),
    );
  }
}
