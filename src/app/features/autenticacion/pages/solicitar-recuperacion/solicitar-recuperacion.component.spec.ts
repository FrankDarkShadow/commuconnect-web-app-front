import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarRecuperacionComponent } from './solicitar-recuperacion.component';

describe('SolicitarRecuperacionComponent', () => {
  let component: SolicitarRecuperacionComponent;
  let fixture: ComponentFixture<SolicitarRecuperacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarRecuperacionComponent]
    });
    fixture = TestBed.createComponent(SolicitarRecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
