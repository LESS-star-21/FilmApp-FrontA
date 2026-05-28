import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film, CreateFilmRequest, UpdateFilmRequest, RateFilmRequest } from '../models/film';

@Injectable({ providedIn: 'root' })
export class FilmsService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://filmapp-ecz6.onrender.com/api/v1';

  getAll() {
    return this.http.get<Film[]>(`${this.API_URL}/films`);
  }

  getById(id: string) {
    return this.http.get<Film>(`${this.API_URL}/films/${id}`);
  }

  create(data: CreateFilmRequest) {
    return this.http.post<Film>(`${this.API_URL}/films`, data);
  }

  update(id: string, data: UpdateFilmRequest) {
    return this.http.put<Film>(`${this.API_URL}/films/${id}`, data);
  }

  rate(id: string, data: RateFilmRequest) {
    return this.http.patch<Film>(`${this.API_URL}/films/${id}/rate`, data);
  }

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.API_URL}/films/${id}`);
  }
}
