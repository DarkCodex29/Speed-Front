import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FilesAreaComponent } from './files-area.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FilesAreaRoutingModule } from './files-area-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FilesAreaRoutingModule, CustomReactiveFormDirective, TableModule],
  declarations: [FilesAreaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilesAreaModule {}
