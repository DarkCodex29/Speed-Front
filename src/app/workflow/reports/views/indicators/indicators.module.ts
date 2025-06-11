import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IndicatorsComponent } from './indicators.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsRoutingModule } from './indicators-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IndicatorsRoutingModule, CustomReactiveFormDirective],
  declarations: [IndicatorsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndicatorsModule {}
