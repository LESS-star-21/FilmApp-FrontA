import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectorsPage } from './directors-page';

describe('DirectorsPage', () => {
  let component: DirectorsPage;
  let fixture: ComponentFixture<DirectorsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DirectorsPage] }).compileComponents();
    fixture = TestBed.createComponent(DirectorsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
