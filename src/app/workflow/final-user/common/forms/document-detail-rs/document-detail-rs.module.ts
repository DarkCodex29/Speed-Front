import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDetailRsComponent } from './document-detail-rs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterRequestModule } from '../../../views/register-request/register-request.module';
import { ContractFormModule } from '../contract-form/contract-form.module';
import { AddendumFormModule } from '../addendum-form/addendum-form.module';
import { AutomaticAddendumFormModule } from '../automatic-addendum-form/automatic-addendum-form.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRequestModule,
    ContractFormModule,
    AddendumFormModule,
    AutomaticAddendumFormModule,
    CustomReactiveFormDirective,
  ],
  declarations: [DocumentDetailRsComponent],
  exports: [DocumentDetailRsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocumentDetailRsModule {}
