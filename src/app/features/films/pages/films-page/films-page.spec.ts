import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmsPage } from './films-page';

describe('FilmsPage', () => {
  let component: FilmsPage;
  let fixture: ComponentFixture<FilmsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
