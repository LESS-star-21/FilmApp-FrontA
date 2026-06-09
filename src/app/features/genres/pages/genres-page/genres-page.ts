import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenresService } from '../../services/genres';
import { Genre, CreateGenreRequest } from '../../models/genre';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genres-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './genres-page.html',
  styleUrl: './genres-page.scss',
})
export class GenresPage implements OnInit {
  private genresService = inject(GenresService);

  genres = signal<Genre[]>([]);
  loading = signal(false);
  error = signal('');
  showForm = signal(false);

  newGenre: CreateGenreRequest = { name: '', description: '' };

  ngOnInit() { this.loadGenres(); }

  loadGenres() {
    this.loading.set(true);
    this.genresService.getAll().subscribe({
      next: (data) => { this.genres.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.error?.message ?? 'Error al cargar'); this.loading.set(false); },
    });
  }

  addGenre() {
    if (!this.newGenre.name) return;
    this.genresService.create(this.newGenre).subscribe({
      next: (genre) => {
        this.genres.update((list) => [genre, ...list]);
        this.newGenre = { name: '', description: '' };
        this.showForm.set(false);
      },
      error: (err) => this.error.set(err.error?.message ?? 'Error al agregar'),
    });
  }

  deleteGenre(id: string) {
    this.genresService.delete(id).subscribe({
      next: () => this.genres.update((list) => list.filter((g) => g._id !== id)),
    });
  }
}
