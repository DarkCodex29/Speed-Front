import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SearchDocumentsComponent } from './search-documents.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchDocumentsRoutingModule } from './search-documents-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TabsModule } from '@speed/common/tabs';
import { ContractDetailModule, DocumentSearchTabModule } from '@speed/final-user/common/forms';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    SearchDocumentsRoutingModule,
    ReactiveFormsModule,
    DocumentSearchTabModule,
    CustomReactiveFormDirective,
    ContractDetailModule,
    TabsModule,
    TreeTableModule,
    InputTextModule,
  ],
  declarations: [SearchDocumentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchDocumentsModule {}
