import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PendingTrayStatusComponent } from './pending-tray-status.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PendingTrayStatusRoutingModule } from './pending-tray-status-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PendingTrayStatusRoutingModule, CustomReactiveFormDirective, TableModule],
  declarations: [PendingTrayStatusComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PendingTrayStatusModule {}
