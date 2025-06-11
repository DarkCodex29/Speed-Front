import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TemplateMaintenanceComponent } from './template-maintenance.component';
import { TemplateMaintenanceRoutingModule } from './template-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TemplateMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [TemplateMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplateMaintenanceModule {}
