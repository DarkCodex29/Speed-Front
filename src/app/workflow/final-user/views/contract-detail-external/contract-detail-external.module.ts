import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ContractDetailExternalRoutingModule } from './contract-detail-external-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from '@speed/common/tabs';
import { ContractDetailModule } from '@speed/final-user/common/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ContractDetailExternalContainer } from './contract-detail-external.container';
import { ContractDetailExternalComponent } from './contract-detail-external.component';

@NgModule({
  imports: [
    CommonModule,
    ContractDetailExternalRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    ContractDetailModule,
    FinalUserComponentsModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [ContractDetailExternalContainer, ContractDetailExternalComponent],
  exports: [ContractDetailExternalContainer, ContractDetailExternalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContratDetailExternalModule {}
