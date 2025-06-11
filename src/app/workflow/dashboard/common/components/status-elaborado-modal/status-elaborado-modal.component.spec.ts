import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusElaboradoModalComponent } from './status-elaborado-modal.component';

describe('StatusElaboradoModalComponent', () => {
  let component: StatusElaboradoModalComponent;
  let fixture: ComponentFixture<StatusElaboradoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusElaboradoModalComponent]
    });
    fixture = TestBed.createComponent(StatusElaboradoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
