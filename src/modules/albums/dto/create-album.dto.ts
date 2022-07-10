import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  released: string;

  @IsArray()
  @IsOptional()
  artistsIds: string[];

  @IsArray()
  @IsOptional()
  bandsIds: string[];

  @IsArray()
  @IsOptional()
  trackIds: string[];

  @IsArray()
  @IsOptional()
  genresIds: string[];
}
