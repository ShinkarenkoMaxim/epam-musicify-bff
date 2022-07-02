import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  private baseUrl = 'http://localhost:3004/v1/users/';

  constructor(private readonly httpService: HttpService) {}

  async create(user: CreateUserDto) {
    const res = await lastValueFrom(
      this.httpService
        .post(this.baseUrl + 'register', user)
        .pipe(map((response) => response.data)),
    );
    return res;
  }

  async findUnique(id: string) {
    return lastValueFrom(
      this.httpService
        .get(this.baseUrl + id)
        .pipe(map((response) => response.data)),
    );
  }

  async login(email: string, password: string) {
    return lastValueFrom(
      this.httpService
        .post(this.baseUrl + 'login', { email, password })
        .pipe(map((response) => response.data)),
    );
  }
}
