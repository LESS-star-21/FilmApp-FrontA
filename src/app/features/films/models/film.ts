export interface Film {
  _id?: string;
  title: string;
  year: number;
  genre: string;
  type: 'movie' | 'series';
  status: 'pending' | 'watched';
  rating?: number;
  review?: string;
  user?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateFilmRequest {
  title: string;
  year: number;
  genre: string;
  type: 'movie' | 'series';
  status?: 'pending' | 'watched';
  rating?: number;
  review?: string;
}

export interface UpdateFilmRequest {
  title?: string;
  year?: number;
  genre?: string;
  type?: 'movie' | 'series';
  status?: 'pending' | 'watched';
  rating?: number;
  review?: string;
}

export interface RateFilmRequest {
  rating: number;
  review?: string;
}
