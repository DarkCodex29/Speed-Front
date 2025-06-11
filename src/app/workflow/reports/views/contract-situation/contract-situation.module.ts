import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ContractSituationComponent } from './contract-situation.component';
import { CommonModule } from '@angular/common';
import { ContractSituationRoutingModule } from './contract-situation-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ContractSituationRoutingModule, CustomReactiveFormDirective],
  declarations: [ContractSituationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContractSituationModule {}
