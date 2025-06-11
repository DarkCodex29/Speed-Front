import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { NotificationTypeMaintenanceComponent } from './notification-type-maintenance.component';
import { NotificationTypeMaintenanceRoutingModule } from './notification-type-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationTypeMaintenanceRoutingModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [NotificationTypeMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotificationTypeMaintenanceModule {}
