import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PendingRoutingModule } from './pending-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PendingContainer } from './pending.container';
import { PendingComponent } from './pending.component';
import { TabsModule } from '@speed/common/tabs';
import { ContractDetailModule } from '@speed/final-user/common/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    PendingRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    ContractDetailModule,
    FinalUserComponentsModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [PendingContainer, PendingComponent],
  exports: [PendingContainer, PendingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PendingModule {}
