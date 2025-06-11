import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VirtualAssistantMaintenanceRoutingModule } from './virtual-assistant-maintenance-routing.module';
import { VirtualAssistantMaintenanceComponent } from './virtual-assistant-maintenance.component';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VirtualAssistantMaintenanceRoutingModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [VirtualAssistantMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VirtualAssistantMaintenanceModule {}
