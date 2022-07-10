import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @ResolveField()
  async id(@Parent() user) {
    return user._id;
  }

  @Query()
  async user(@Args('id') id: string): Promise<any> {
    const user = await this.usersService.findUnique(id);
    return user;
  }

  @Query()
  async jwt(@Args('email') email: string, @Args('password') password: string) {
    const jwt = await this.usersService.login(email, password);
    return jwt;
  }

  @Mutation('register')
  async register(@Args('createUserInput') args: CreateUserDto): Promise<any> {
    const createdUser = await this.usersService.create(args);
    return createdUser;
  }
}
