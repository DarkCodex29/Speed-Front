import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RegisterRequestRoutingModule } from './register-request-routing.module';
import { RegisterRequestContainer } from './register-request.container';
import { RegisterRequestComponent } from './register-request.component';
import { AddendumFormComponent, AutomaticAddendumFormComponent, ContractFormComponent } from './views';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RegisterRequestRoutingModule, FinalUserComponentsModule, CustomReactiveFormDirective],
  declarations: [
    RegisterRequestContainer,
    RegisterRequestComponent,
    AddendumFormComponent,
    AutomaticAddendumFormComponent,
    ContractFormComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterRequestModule {}
