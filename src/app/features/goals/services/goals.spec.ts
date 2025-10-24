import { TestBed } from '@angular/core/testing';

import { Goals } from './goals';

describe('Goals', () => {
  let service: Goals;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Goals);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
