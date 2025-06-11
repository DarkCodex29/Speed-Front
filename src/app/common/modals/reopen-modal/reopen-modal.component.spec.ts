import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenModalComponent } from './reopen-modal.component';

describe('ReopenModalComponent', () => {
  let component: ReopenModalComponent;
  let fixture: ComponentFixture<ReopenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReopenModalComponent],
    });
    fixture = TestBed.createComponent(ReopenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
