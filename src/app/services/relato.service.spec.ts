import { TestBed } from '@angular/core/testing';

import { RelatosService } from './relatos.service';

describe('RelatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelatosService = TestBed.get(RelatosService);
    expect(service).toBeTruthy();
  });
});
