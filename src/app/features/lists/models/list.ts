import { Film } from '../../films/models/film';

export interface FilmList {
  _id?: string;
  name: string;
  description?: string;
  films: Film[];
  user?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateListRequest {
  name: string;
  description?: string;
}

export interface UpdateListRequest {
  name?: string;
  description?: string;
}

export interface AddFilmToListRequest {
  filmId: string;
}
