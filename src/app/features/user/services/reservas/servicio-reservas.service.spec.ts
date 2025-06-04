import { TestBed } from '@angular/core/testing';

import { ServicioReservasService } from './servicio-reservas.service';

describe('ServicioReservasService', () => {
  let service: ServicioReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
