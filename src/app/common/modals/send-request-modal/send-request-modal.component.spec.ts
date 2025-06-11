import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequestModalComponent } from './send-request-modal.component';

describe('SendRequestModalComponent', () => {
  let component: SendRequestModalComponent;
  let fixture: ComponentFixture<SendRequestModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendRequestModalComponent],
    });
    fixture = TestBed.createComponent(SendRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
