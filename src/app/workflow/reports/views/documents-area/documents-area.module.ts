import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DocumentsAreaComponent } from './documents-area.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentsAreaRoutingModule } from './documents-area-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DocumentsAreaRoutingModule, CustomReactiveFormDirective, TableModule],
  declarations: [DocumentsAreaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocumentsAreaModule {}
