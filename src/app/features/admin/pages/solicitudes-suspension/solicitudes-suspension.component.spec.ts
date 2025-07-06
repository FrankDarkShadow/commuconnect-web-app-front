import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesSuspensionComponent } from './solicitudes-suspension.component';

describe('SolicitudesSuspensionComponent', () => {
  let component: SolicitudesSuspensionComponent;
  let fixture: ComponentFixture<SolicitudesSuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesSuspensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 