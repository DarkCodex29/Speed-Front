import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsContainer } from './requests.container';
import { RequestsComponent } from './requests.component';
import { TabsModule } from '@speed/common/tabs';
import { ContractDetailModule } from '@speed/final-user/common/forms';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    RequestsRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    ContractDetailModule,
    FinalUserComponentsModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [RequestsContainer, RequestsComponent],
  exports: [RequestsContainer, RequestsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RequestsModule {}
