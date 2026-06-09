import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FilmsService } from '../../services/films';
import { Session } from '../../../../shared/services/session';
import { Film, CreateFilmRequest } from '../../models/film';

@Component({
  selector: 'app-films-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './films-page.html',
  styleUrl: './films-page.scss',
})
export class FilmsPage implements OnInit {

  private filmsService = inject(FilmsService);
  private session = inject(Session);
  private router = inject(Router);

  films = signal<Film[]>([]);
  loading = signal(false);
  error = signal('');
  showForm = signal(false);

  filterType: 'all' | 'movie' | 'series' = 'all';
  filterStatus: 'all' | 'pending' | 'watched' = 'all';

  newFilm: CreateFilmRequest = {
  title: '',
  year: new Date().getFullYear(),
  genre: '',
  type: 'movie',
  status: 'pending',
  rating: 0,
  review: '',
  director: '',
  actor: '',
};

  editingId: string | null = null;
  editFilm: Partial<Film> = {};

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms() {
    this.loading.set(true);
    this.filmsService.getAll().subscribe({
      next: (data) => { this.films.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.error?.message ?? 'Error al cargar'); this.loading.set(false); },
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
  const data: any = { ...this.newFilm };
  if (!data.rating || data.rating === 0) delete data.rating;
  if (!data.review || data.review.trim() === '') delete data.review;
  if (!data.director || data.director.trim() === '') delete data.director;
  if (!data.actor || data.actor.trim() === '') delete data.actor;

  this.filmsService.create(data).subscribe({
    next: (film) => {
      this.films.update((list) => [film, ...list]);
      this.resetForm();
      this.showForm.set(false);
    },
    error: (err) => this.error.set(err.error?.message ?? 'Error al agregar'),
  });
}

  startEdit(film: Film) {
    this.editingId = film._id!;
    this.editFilm = { ...film };
  }

  saveEdit() {
    if (!this.editingId) return;

    const data: any = {
      title: this.editFilm.title,
      year: this.editFilm.year,
      genre: this.editFilm.genre,
      type: this.editFilm.type,
      status: this.editFilm.status,
    };

    if (this.editFilm.review && this.editFilm.review.trim() !== '') {
      data.review = this.editFilm.review;
    }

    this.filmsService.update(this.editingId, data).subscribe({
      next: (updated) => {
        if (this.editFilm.rating && this.editFilm.rating > 0) {
          this.filmsService.rate(updated._id!, this.editFilm.rating, this.editFilm.review).subscribe({
            next: (rated) => {
              this.films.update((list) => list.map((f) => f._id === rated._id ? rated : f));
              this.editingId = null;
              this.editFilm = {};
            },
          });
        } else {
          this.films.update((list) => list.map((f) => f._id === updated._id ? updated : f));
          this.editingId = null;
          this.editFilm = {};
        }
      },
      error: (err) => this.error.set(err.error?.message ?? 'Error al guardar'),
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editFilm = {};
  }

  deleteFilm(id: string) {
    this.filmsService.delete(id).subscribe({
      next: () => {
        this.films.update((list) => list.filter((f) => f._id !== id));
        this.editingId = null;
      },
    });
  }

  resetForm() {
  this.newFilm = {
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    type: 'movie',
    status: 'pending',
    rating: 0,
    review: '',
    director: '',
    actor: '',
  };
}

  logout() {
    this.session.removeToken();
    this.router.navigate(['/login']);
  }

  starsArray(n: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}