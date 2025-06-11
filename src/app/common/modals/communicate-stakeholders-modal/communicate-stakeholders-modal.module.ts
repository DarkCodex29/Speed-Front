import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { CommunicateStakeholdersContainer } from './communicate-stakeholders-modal.container';
import { CommunicateStakeholdersComponent } from './communicate-stakeholders-modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective],
  declarations: [CommunicateStakeholdersContainer, CommunicateStakeholdersComponent],
  exports: [CommunicateStakeholdersContainer, CommunicateStakeholdersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommunicateStakeholdersModule {}
