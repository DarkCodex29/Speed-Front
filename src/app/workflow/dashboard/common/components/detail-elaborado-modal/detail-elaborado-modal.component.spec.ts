import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailElaboradoModalComponent } from './detail-elaborado-modal.component';

describe('DetailElaboradoModalComponent', () => {
  let component: DetailElaboradoModalComponent;
  let fixture: ComponentFixture<DetailElaboradoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailElaboradoModalComponent]
    });
    fixture = TestBed.createComponent(DetailElaboradoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
