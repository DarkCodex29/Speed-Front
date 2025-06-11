import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterManualAddendumRoutingModule } from './register-manual-addendum-routing.module';
import { RegisterManualAddendumContainer } from './register-manual-addendum.container';
import { RegisterManualAddendumComponent } from './register-manual-addendum.component';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';

@NgModule({
  imports: [
    CommonModule,
    RegisterManualAddendumRoutingModule,
    FinalUserComponentsModule,
    ReactiveFormsModule,
    CustomReactiveFormDirective,
  ],
  declarations: [RegisterManualAddendumContainer, RegisterManualAddendumComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterManualAddendumModule {}
