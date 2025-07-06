import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSuspensionComponent } from './detalle-suspension.component';

describe('DetalleSuspensionComponent', () => {
  let component: DetalleSuspensionComponent;
  let fixture: ComponentFixture<DetalleSuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSuspensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 