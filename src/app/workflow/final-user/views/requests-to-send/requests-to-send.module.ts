import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RequestsToSendRoutingModule } from './requests-to-send-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestsToSendContainer } from './requests-to-send.container';
import { RequestsToSendComponent } from './requests-to-send.component';
import { TabsModule } from '@speed/common/tabs';
import { DocumentDetailRsModule } from '@speed/final-user/common/forms';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    RequestsToSendRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    DocumentDetailRsModule,
    FinalUserComponentsModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [RequestsToSendContainer, RequestsToSendComponent],
  exports: [RequestsToSendContainer, RequestsToSendComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RequestsToSendModule {}
