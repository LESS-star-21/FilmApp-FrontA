import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film, CreateFilmRequest, UpdateFilmRequest } from '../models/film';
import { Session } from '../../../shared/services/session';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  private http = inject(HttpClient);
  private session = inject(Session);
  private readonly API_URL = 'https://filmapp-ecz6.onrender.com/api/v1';

  private getHeaders() {
    return { Authorization: `Bearer ${this.session.getToken()}` };
  }

  getAll() {
    return this.http.get<Film[]>(`${this.API_URL}/films`, { headers: this.getHeaders() });
  }

  getById(id: string) {
    return this.http.get<Film>(`${this.API_URL}/films/${id}`, { headers: this.getHeaders() });
  }

  create(data: CreateFilmRequest) {
    return this.http.post<Film>(`${this.API_URL}/films`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: UpdateFilmRequest) {
    return this.http.put<Film>(`${this.API_URL}/films/${id}`, data, { headers: this.getHeaders() });
  }

  rate(id: string, rating: number, review?: string) {
  const body: any = { rating };
  if (review && review.trim() !== '') {
    body.review = review;
  }
  return this.http.patch<Film>(`${this.API_URL}/films/${id}/rate`, body, { headers: this.getHeaders() });
}

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.API_URL}/films/${id}`, { headers: this.getHeaders() });
  }
}
