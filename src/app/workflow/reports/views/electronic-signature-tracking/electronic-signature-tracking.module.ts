import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ElectronicSignatureTrackingComponent } from './electronic-signature-tracking.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ElectronicSignatureTrackingRoutingModule } from './electronic-signature-tracking-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ElectronicSignatureTrackingRoutingModule,
    CustomReactiveFormDirective,
  ],
  declarations: [ElectronicSignatureTrackingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ElectronicSignatureTrackingModule {}
