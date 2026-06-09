import { TestBed } from '@angular/core/testing';
import { DirectorsService } from './directors';

describe('DirectorsService', () => {
  let service: DirectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectorsService);
  });

  it('should be created', () => { expect(service).toBeTruthy(); });
});
