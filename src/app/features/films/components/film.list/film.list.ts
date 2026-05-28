import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilmsService } from '../../services/film';
import { AuthService } from '../../../auth/services/auth';
import { Film, CreateFilmRequest } from '../../models/film';

@Component({
  selector: 'app-film-list',
  imports: [FormsModule],
  templateUrl: './film.list.html',
  styleUrl: './film.list.scss',
})
export class FilmList implements OnInit {
  private filmsService = inject(FilmsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  films = signal<Film[]>([]);
  loading = signal(false);
  error = signal('');
  showForm = signal(false);

  // Filtros
  filterType: 'all' | 'movie' | 'series' = 'all';
  filterStatus: 'all' | 'pending' | 'watched' = 'all';

  // Nuevo film
  newFilm: CreateFilmRequest = {
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    type: 'movie',
    status: 'pending',
  };

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms() {
    this.loading.set(true);
    this.filmsService.getAll().subscribe({
      next: (data) => {
        this.films.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Error al cargar películas');
        this.loading.set(false);
      },
    });
  }

  get filteredFilms(): Film[] {
    return this.films().filter((f) => {
      const typeMatch = this.filterType === 'all' || f.type === this.filterType;
      const statusMatch = this.filterStatus === 'all' || f.status === this.filterStatus;
      return typeMatch && statusMatch;
    });
  }

  addFilm() {
    if (!this.newFilm.title || !this.newFilm.genre) return;
    this.filmsService.create(this.newFilm).subscribe({
      next: (film) => {
        this.films.update((list) => [film, ...list]);
        this.resetForm();
        this.showForm.set(false);
      },
      error: (err) => this.error.set(err.error?.message ?? 'Error al agregar'),
    });
  }

  markWatched(film: Film) {
    if (!film._id) return;
    this.filmsService.update(film._id, { status: 'watched' }).subscribe({
      next: (updated) => {
        this.films.update((list) => list.map((f) => (f._id === updated._id ? updated : f)));
      },
    });
  }

  deleteFilm(id: string) {
    this.filmsService.delete(id).subscribe({
      next: () => this.films.update((list) => list.filter((f) => f._id !== id)),
    });
  }

  resetForm() {
    this.newFilm = {
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      type: 'movie',
      status: 'pending',
    };
  }

  logout() {
    this.authService.logout();
  }

  starsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
