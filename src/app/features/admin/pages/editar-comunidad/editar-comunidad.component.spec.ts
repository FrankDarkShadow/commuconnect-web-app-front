import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComunidadComponent } from './editar-comunidad.component';

describe('EditarComunidadComponent', () => {
  let component: EditarComunidadComponent;
  let fixture: ComponentFixture<EditarComunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarComunidadComponent]
    });
    fixture = TestBed.createComponent(EditarComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
