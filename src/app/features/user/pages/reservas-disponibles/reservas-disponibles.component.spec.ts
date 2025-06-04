import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDisponiblesComponent } from './reservas-disponibles.component';

describe('ReservasDisponiblesComponent', () => {
  let component: ReservasDisponiblesComponent;
  let fixture: ComponentFixture<ReservasDisponiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasDisponiblesComponent]
    });
    fixture = TestBed.createComponent(ReservasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
