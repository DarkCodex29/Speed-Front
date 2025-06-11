import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RequestsElectronicSignatureComponent } from './requests-electronic-signature.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestsElectronicSignatureRoutingModule } from './requests-electronic-signature-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RequestsElectronicSignatureRoutingModule,
    CustomReactiveFormDirective,
  ],
  declarations: [RequestsElectronicSignatureComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RequestsElectronicSignatureModule {}
