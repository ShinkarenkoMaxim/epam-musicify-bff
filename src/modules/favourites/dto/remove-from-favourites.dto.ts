import { IsString } from 'class-validator';

export class RemoveFromFavouritesDto {
  @IsString()
  type: 'bands' | 'genres' | 'artists' | 'tracks';

  @IsString()
  id: string;
}
