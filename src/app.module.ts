import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { BandsModule } from './modules/bands/bands.module';
import { GenresModule } from './modules/genres/genres.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    BandsModule,
    GenresModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req }: any) => ({ req }),
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
  ],
})
export class AppModule {}
