import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor, CreateActorRequest, UpdateActorRequest } from '../models/actor';
import { Session } from '../../../shared/services/session';

@Injectable({ providedIn: 'root' })
export class ActorsService {
  private http = inject(HttpClient);
  private session = inject(Session);
  private readonly API_URL = 'https://filmapp-ecz6.onrender.com/api/v1';

  private getHeaders() {
    return { Authorization: `Bearer ${this.session.getToken()}` };
  }

  getAll() {
    return this.http.get<Actor[]>(`${this.API_URL}/actors`, { headers: this.getHeaders() });
  }

  getById(id: string) {
    return this.http.get<Actor>(`${this.API_URL}/actors/${id}`, { headers: this.getHeaders() });
  }

  create(data: CreateActorRequest) {
    return this.http.post<Actor>(`${this.API_URL}/actors`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: UpdateActorRequest) {
    return this.http.put<Actor>(`${this.API_URL}/actors/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.API_URL}/actors/${id}`, { headers: this.getHeaders() });
  }
}
