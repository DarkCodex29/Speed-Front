import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { DocumentTypeMaintenanceComponent } from './document-type-maintenance.component';
import { DocumentTypeMaintenanceRoutingModule } from './document-type-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DocumentTypeMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [DocumentTypeMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocumentTypeMaintenanceModule {}
