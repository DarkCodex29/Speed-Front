import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdendaDataModalComponent } from './adenda-data-modal.component';

describe('AdendaDataModalComponent', () => {
  let component: AdendaDataModalComponent;
  let fixture: ComponentFixture<AdendaDataModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdendaDataModalComponent],
    });
    fixture = TestBed.createComponent(AdendaDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
