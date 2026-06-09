import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmList, CreateListRequest, UpdateListRequest, AddFilmToListRequest } from '../models/list';
import { Session } from '../../../shared/services/session';

@Injectable({ providedIn: 'root' })
export class ListsService {
  private http = inject(HttpClient);
  private session = inject(Session);
  private readonly API_URL = 'https://filmapp-ecz6.onrender.com/api/v1';

  private getHeaders() {
    return { Authorization: `Bearer ${this.session.getToken()}` };
  }

  getAll() {
    return this.http.get<FilmList[]>(`${this.API_URL}/lists`, { headers: this.getHeaders() });
  }

  getById(id: string) {
    return this.http.get<FilmList>(`${this.API_URL}/lists/${id}`, { headers: this.getHeaders() });
  }

  create(data: CreateListRequest) {
    return this.http.post<FilmList>(`${this.API_URL}/lists`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: UpdateListRequest) {
    return this.http.put<FilmList>(`${this.API_URL}/lists/${id}`, data, { headers: this.getHeaders() });
  }

  addFilm(id: string, data: AddFilmToListRequest) {
    return this.http.post<FilmList>(`${this.API_URL}/lists/${id}/films`, data, { headers: this.getHeaders() });
  }

  removeFilm(id: string, data: AddFilmToListRequest) {
  return this.http.request<FilmList>('delete', `${this.API_URL}/lists/${id}/films`, {
    headers: this.getHeaders(),
    body: data,
  });
}

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.API_URL}/lists/${id}`, { headers: this.getHeaders() });
  }
}
