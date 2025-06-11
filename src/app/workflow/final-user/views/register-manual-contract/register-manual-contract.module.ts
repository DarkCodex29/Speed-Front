import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RegisterManualContractRoutingModule } from './register-manual-contract-routing.module';
import { RegisterManualContractContainer } from './register-manual-contract.container';
import { RegisterManualContractComponent } from './register-manual-contract.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';

@NgModule({
  imports: [
    CommonModule,
    RegisterManualContractRoutingModule,
    FinalUserComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomReactiveFormDirective,
  ],
  declarations: [RegisterManualContractContainer, RegisterManualContractComponent],
  exports: [RegisterManualContractContainer, RegisterManualContractComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterManualContractModule {}
