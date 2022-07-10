
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AlbumInput {
    name?: Nullable<string>;
    released?: Nullable<number>;
    artistsIds?: Nullable<Nullable<string>[]>;
    bandsIds?: Nullable<Nullable<string>[]>;
    trackIds?: Nullable<Nullable<string>[]>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export interface PaginationInput {
    limit?: Nullable<number>;
    offset?: Nullable<number>;
}

export interface ArtistInput {
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bandsIds?: Nullable<Nullable<string>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export interface FilterInput {
    artistsIds?: Nullable<Nullable<string>[]>;
    bandsIds?: Nullable<Nullable<string>[]>;
    genresIds?: Nullable<Nullable<string>[]>;
    tracksIds?: Nullable<Nullable<string>[]>;
}

export interface BandInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    website?: Nullable<string>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export interface MemberInput {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<Nullable<string>[]>;
}

export interface GenreInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export interface TrackInput {
    title?: Nullable<string>;
    albumId?: Nullable<string>;
    bandsIds?: Nullable<Nullable<string>[]>;
    artistsIds?: Nullable<Nullable<string>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export interface CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
}

export interface Album {
    id: string;
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    image?: Nullable<string>;
}

export interface IQuery {
    album(id: string): Nullable<Album> | Promise<Nullable<Album>>;
    albums(paginationInput?: Nullable<PaginationInput>): Nullable<AlbumsResult> | Promise<Nullable<AlbumsResult>>;
    artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;
    artists(paginationInput?: Nullable<PaginationInput>, filter?: Nullable<FilterInput>): Nullable<ArtistsResult> | Promise<Nullable<ArtistsResult>>;
    band(id: string): Nullable<Band> | Promise<Nullable<Band>>;
    bands(paginationInput?: Nullable<PaginationInput>, filter?: Nullable<FilterInput>): Nullable<BandsResult> | Promise<Nullable<BandsResult>>;
    favourites(): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;
    genres(paginationInput?: Nullable<PaginationInput>, filter?: Nullable<FilterInput>): Nullable<GenresResult> | Promise<Nullable<GenresResult>>;
    track(id: string): Nullable<Track> | Promise<Nullable<Track>>;
    tracks(paginationInput?: Nullable<PaginationInput>, filter?: Nullable<FilterInput>): Nullable<TracksResult> | Promise<Nullable<TracksResult>>;
    user(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    jwt(email: string, password: string): Nullable<JWT> | Promise<Nullable<JWT>>;
}

export interface IMutation {
    createAlbum(createAlbumInput?: Nullable<AlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;
    updateAlbum(id: string, updateAlbumInput?: Nullable<AlbumInput>): Nullable<Album> | Promise<Nullable<Album>>;
    deleteAlbum(id: string): Nullable<DeleteAlbumResult> | Promise<Nullable<DeleteAlbumResult>>;
    createArtist(createArtistInput?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;
    updateArtist(id: string, updateArtistInput?: Nullable<ArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;
    deleteArtist(id: string): Nullable<DeleteArtistResult> | Promise<Nullable<DeleteArtistResult>>;
    createBand(createBandInput?: Nullable<BandInput>, createMembersInput?: Nullable<Nullable<MemberInput>[]>): Nullable<Band> | Promise<Nullable<Band>>;
    updateBand(id: string, updateBandInput?: Nullable<BandInput>, updateMembersInput?: Nullable<Nullable<MemberInput>[]>): Nullable<Band> | Promise<Nullable<Band>>;
    deleteBand(id: string): Nullable<DeleteBandResult> | Promise<Nullable<DeleteBandResult>>;
    addTrackToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    addBandToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    addArtistToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    addGenreToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    removeTrackToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    removeBandToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    removeArtistToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    removeGenreToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;
    createGenre(createGenreInput?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;
    updateGenre(id: string, updateGenreInput?: Nullable<GenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;
    deleteGenre(id: string): Nullable<DeleteGenreResult> | Promise<Nullable<DeleteGenreResult>>;
    createTrack(createTrackInput?: Nullable<TrackInput>): Nullable<Track> | Promise<Nullable<Track>>;
    updateTrack(id: string, updateTrackInput?: Nullable<TrackInput>): Nullable<Track> | Promise<Nullable<Track>>;
    deleteTrack(id: string): Nullable<DeleteTrackResult> | Promise<Nullable<DeleteTrackResult>>;
    register(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export interface DeleteAlbumResult {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export interface AlbumsResult {
    items?: Nullable<Nullable<Album>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export interface Artist {
    id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export interface DeleteArtistResult {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export interface ArtistsResult {
    items?: Nullable<Nullable<Artist>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export interface Band {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<Member>[]>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export interface Member {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<Nullable<string>[]>;
}

export interface DeleteBandResult {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export interface BandsResult {
    items?: Nullable<Nullable<Band>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export interface Favourites {
    id: string;
    userId?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    artists?: Nullable<Nullable<Artist>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
}

export interface Genre {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export interface DeleteGenreResult {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export interface GenresResult {
    items?: Nullable<Nullable<Genre>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export interface Track {
    id: string;
    title: string;
    album?: Nullable<Album>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export interface DeleteTrackResult {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export interface TracksResult {
    items?: Nullable<Nullable<Track>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export interface User {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    email: string;
}

export interface JWT {
    jwt: string;
}

type Nullable<T> = T | null;
