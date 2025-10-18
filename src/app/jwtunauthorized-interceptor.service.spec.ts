import { TestBed } from '@angular/core/testing';

import { JWTUnauthorizedInterceptorService } from './jwtunauthorized-interceptor.service';

describe('JWTUnauthorizedInterceptorService', () => {
  let service: JWTUnauthorizedInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTUnauthorizedInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
