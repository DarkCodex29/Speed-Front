import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxContainer } from './inbox.container';
import { InboxComponent } from './inbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from '@speed/common/tabs';
import { ContractDetailModule } from '@speed/final-user/common/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    InboxRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    ContractDetailModule,
    FinalUserComponentsModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [InboxContainer, InboxComponent],
  exports: [InboxContainer, InboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InboxModule {}
