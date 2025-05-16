import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComunidadComponent } from './registro-comunidad.component';

describe('RegistroComunidadComponent', () => {
  let component: RegistroComunidadComponent;
  let fixture: ComponentFixture<RegistroComunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroComunidadComponent]
    });
    fixture = TestBed.createComponent(RegistroComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
