import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ListsService } from '../../services/lists';
import { FilmsService } from '../../../films/services/films';
import { FilmList, CreateListRequest } from '../../models/list';
import { Film } from '../../../films/models/film';

@Component({
  selector: 'app-lists-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './lists-page.html',
  styleUrl: './lists-page.scss',
})
export class ListsPage implements OnInit {
  private listsService = inject(ListsService);
  private filmsService = inject(FilmsService);

  lists = signal<FilmList[]>([]);
  allFilms = signal<Film[]>([]);
  loading = signal(false);
  error = signal('');

  showForm = signal(false);
  selectedListId: string | null = null;
  showAddFilm: string | null = null;

  newList: CreateListRequest = { name: '', description: '' };

  ngOnInit() {
    this.loadLists();
    this.loadFilms();
  }

  loadLists() {
    this.loading.set(true);
    this.listsService.getAll().subscribe({
      next: (data) => { this.lists.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.error?.message ?? 'Error al cargar'); this.loading.set(false); },
    });
  }

  loadFilms() {
    this.filmsService.getAll().subscribe({
      next: (data) => this.allFilms.set(data),
      error: () => {},
    });
  }

  addList() {
    if (!this.newList.name) return;
    this.listsService.create(this.newList).subscribe({
      next: (list) => {
        this.lists.update((all) => [list, ...all]);
        this.newList = { name: '', description: '' };
        this.showForm.set(false);
      },
      error: (err) => this.error.set(err.error?.message ?? 'Error al crear'),
    });
  }

  deleteList(id: string) {
    this.listsService.delete(id).subscribe({
      next: () => {
        this.lists.update((all) => all.filter((l) => l._id !== id));
        if (this.selectedListId === id) this.selectedListId = null;
      },
    });
  }

  selectList(id: string) {
    this.selectedListId = this.selectedListId === id ? null : id;
    this.showAddFilm = null;
  }

  getSelectedList(): FilmList | null {
    return this.lists().find((l) => l._id === this.selectedListId) ?? null;
  }

  toggleAddFilm(listId: string) {
    this.showAddFilm = this.showAddFilm === listId ? null : listId;
  }

  filmsNotInList(list: FilmList): Film[] {
    const ids = (list.films ?? []).map((f) => f._id);
    return this.allFilms().filter((f) => !ids.includes(f._id));
  }

  addFilmToList(listId: string, filmId: string) {
  this.listsService.addFilm(listId, { filmId }).subscribe({
    next: () => {
      this.showAddFilm = null;
      this.loadLists();
    },
    error: (err) => this.error.set(err.error?.message ?? 'Error al agregar'),
  });
}

  removeFilmFromList(listId: string, filmId: string) {
  this.listsService.removeFilm(listId, { filmId }).subscribe({
    next: () => {
      this.loadLists();
    },
    error: (err) => this.error.set(err.error?.message ?? 'Error al quitar'),
  });
}
editingListId: string | null = null;
editListData: { name: string; description: string } = { name: '', description: '' };

startEditList(list: FilmList) {
  this.editingListId = list._id!;
  this.editListData = { name: list.name, description: list.description ?? '' };
}

saveEditList() {
  if (!this.editingListId) return;
  this.listsService.update(this.editingListId, this.editListData).subscribe({
    next: () => {
      this.editingListId = null;
      this.loadLists();
    },
    error: (err) => this.error.set(err.error?.message ?? 'Error al editar'),
  });
}

cancelEditList() {
  this.editingListId = null;
}
}
