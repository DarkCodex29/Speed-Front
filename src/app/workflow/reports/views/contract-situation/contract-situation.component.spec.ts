import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSituationComponent } from './contract-situation.component';

describe('ContractSituationComponent', () => {
  let component: ContractSituationComponent;
  let fixture: ComponentFixture<ContractSituationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractSituationComponent],
    });
    fixture = TestBed.createComponent(ContractSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
