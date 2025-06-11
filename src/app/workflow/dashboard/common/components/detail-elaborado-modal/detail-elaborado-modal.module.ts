import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailElaboradoModalComponent } from './detail-elaborado-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@NgModule({
  declarations: [DetailElaboradoModalComponent],
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective],
  exports: [DetailElaboradoModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailElaboradoModalModule {}
