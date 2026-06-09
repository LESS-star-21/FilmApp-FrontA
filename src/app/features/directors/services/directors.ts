import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Director, CreateDirectorRequest, UpdateDirectorRequest } from '../models/director';
import { Session } from '../../../shared/services/session';

@Injectable({ providedIn: 'root' })
export class DirectorsService {
  private http = inject(HttpClient);
  private session = inject(Session);
  private readonly API_URL = 'https://filmapp-ecz6.onrender.com/api/v1';

  private getHeaders() {
    return { Authorization: `Bearer ${this.session.getToken()}` };
  }

  getAll() {
    return this.http.get<Director[]>(`${this.API_URL}/directors`, { headers: this.getHeaders() });
  }

  getById(id: string) {
    return this.http.get<Director>(`${this.API_URL}/directors/${id}`, { headers: this.getHeaders() });
  }

  create(data: CreateDirectorRequest) {
    return this.http.post<Director>(`${this.API_URL}/directors`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: UpdateDirectorRequest) {
    return this.http.put<Director>(`${this.API_URL}/directors/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.API_URL}/directors/${id}`, { headers: this.getHeaders() });
  }
}
