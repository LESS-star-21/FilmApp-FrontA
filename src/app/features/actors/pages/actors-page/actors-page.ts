import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActorsService } from '../../services/actors';
import { Actor, CreateActorRequest } from '../../models/actor';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-actors-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './actors-page.html',
  styleUrl: './actors-page.scss',
})
export class ActorsPage implements OnInit {
  private actorsService = inject(ActorsService);

  actors = signal<Actor[]>([]);
  loading = signal(false);
  error = signal('');
  showForm = signal(false);

  newActor: CreateActorRequest = { name: '', nationality: '', biography: '' };

  ngOnInit() {
    this.loadActors();
  }

  loadActors() {
    this.loading.set(true);
    this.actorsService.getAll().subscribe({
      next: (data) => { this.actors.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.error?.message ?? 'Error al cargar'); this.loading.set(false); },
    });
  }

  addActor() {
    if (!this.newActor.name) return;
    this.actorsService.create(this.newActor).subscribe({
      next: (actor) => {
        this.actors.update((list) => [actor, ...list]);
        this.newActor = { name: '', nationality: '', biography: '' };
        this.showForm.set(false);
      },
      error: (err) => this.error.set(err.error?.message ?? 'Error al agregar'),
    });
  }

  deleteActor(id: string) {
    this.actorsService.delete(id).subscribe({
      next: () => this.actors.update((list) => list.filter((a) => a._id !== id)),
    });
  }
}
