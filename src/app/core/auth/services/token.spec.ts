import { TestBed } from '@angular/core/testing';

import { Token } from './token';

describe('TokenService', () => {
  let service: Token;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Token);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
