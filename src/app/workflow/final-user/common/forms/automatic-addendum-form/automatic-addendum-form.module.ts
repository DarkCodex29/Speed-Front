import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticAddendumFormComponent } from './automatic-addendum-form.component';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutomaticAddendumFormComponent],
  imports: [CommonModule, FinalUserComponentsModule, ReactiveFormsModule],
  exports: [AutomaticAddendumFormComponent],
})
export class AutomaticAddendumFormModule {}
