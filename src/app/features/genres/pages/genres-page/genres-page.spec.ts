import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenresPage } from './genres-page';

describe('GenresPage', () => {
  let component: GenresPage;
  let fixture: ComponentFixture<GenresPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GenresPage] }).compileComponents();
    fixture = TestBed.createComponent(GenresPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
