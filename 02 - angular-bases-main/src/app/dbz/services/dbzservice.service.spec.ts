import { TestBed } from '@angular/core/testing';

import { DbzService } from './dbzservice.service';

describe('DbzServiceService', () => {
  let service: DbzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
