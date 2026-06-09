import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre, CreateGenreRequest, UpdateGenreRequest } from '../models/genre';
import { Session } from '../../../shared/services/session';

@Injectable({ providedIn: 'root' })
export class GenresService {
  private http = inject(HttpClient);
  private session = inject(Session);
  private readonly API_URL = 'https://filmapp-ecz6.onrender.com/api/v1';

  private getHeaders() {
    return { Authorization: `Bearer ${this.session.getToken()}` };
  }

  getAll() {
    return this.http.get<Genre[]>(`${this.API_URL}/genres`, { headers: this.getHeaders() });
  }

  getById(id: string) {
    return this.http.get<Genre>(`${this.API_URL}/genres/${id}`, { headers: this.getHeaders() });
  }

  create(data: CreateGenreRequest) {
    return this.http.post<Genre>(`${this.API_URL}/genres`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: UpdateGenreRequest) {
    return this.http.put<Genre>(`${this.API_URL}/genres/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.API_URL}/genres/${id}`, { headers: this.getHeaders() });
  }
}
