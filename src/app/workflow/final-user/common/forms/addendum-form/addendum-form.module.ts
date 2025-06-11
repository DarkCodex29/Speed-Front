import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { AddendumFormComponent } from './addendum-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddendumFormComponent],
  imports: [CommonModule, FinalUserComponentsModule, ReactiveFormsModule],
  exports: [AddendumFormComponent],
})
export class AddendumFormModule {}
