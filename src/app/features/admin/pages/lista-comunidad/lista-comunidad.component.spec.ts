import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComunidadComponent } from './lista-comunidad.component';

describe('ListaComunidadComponent', () => {
  let component: ListaComunidadComponent;
  let fixture: ComponentFixture<ListaComunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaComunidadComponent]
    });
    fixture = TestBed.createComponent(ListaComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
