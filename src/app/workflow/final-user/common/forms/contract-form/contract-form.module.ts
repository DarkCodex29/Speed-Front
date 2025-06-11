import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { ContractFormComponent } from './contract-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContractFormComponent],
  imports: [CommonModule, FinalUserComponentsModule, ReactiveFormsModule],
  exports: [ContractFormComponent],
})
export class ContractFormModule {}
