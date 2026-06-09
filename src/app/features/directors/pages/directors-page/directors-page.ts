import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectorsService } from '../../services/directors';
import { Director, CreateDirectorRequest } from '../../models/director';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-directors-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './directors-page.html',
  styleUrl: './directors-page.scss',
})
export class DirectorsPage implements OnInit {
  private directorsService = inject(DirectorsService);

  directors = signal<Director[]>([]);
  loading = signal(false);
  error = signal('');
  showForm = signal(false);

  newDirector: CreateDirectorRequest = { name: '', nationality: '', biography: '' };

  ngOnInit() { this.loadDirectors(); }

  loadDirectors() {
    this.loading.set(true);
    this.directorsService.getAll().subscribe({
      next: (data) => { this.directors.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.error?.message ?? 'Error al cargar'); this.loading.set(false); },
    });
  }

  addDirector() {
    if (!this.newDirector.name) return;
    this.directorsService.create(this.newDirector).subscribe({
      next: (director) => {
        this.directors.update((list) => [director, ...list]);
        this.newDirector = { name: '', nationality: '', biography: '' };
        this.showForm.set(false);
      },
      error: (err) => this.error.set(err.error?.message ?? 'Error al agregar'),
    });
  }

  deleteDirector(id: string) {
    this.directorsService.delete(id).subscribe({
      next: () => this.directors.update((list) => list.filter((d) => d._id !== id)),
    });
  }
}
