import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterpartPanelComponent } from './counterpart-panel/counterpart-panel.component';
import { ElaborationDocumentPanelComponent } from './elaboration-document-panel/elaboration-document-panel.component';
import { AttachmentTabComponent } from './attachments-tab/attachments-tab.component';
import { DocumentUploadComponent } from './documents-upload/documents-upload.component';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomReactiveFormDirective, TableModule],
  declarations: [CounterpartPanelComponent, ElaborationDocumentPanelComponent, AttachmentTabComponent, DocumentUploadComponent],
  exports: [CounterpartPanelComponent, ElaborationDocumentPanelComponent, AttachmentTabComponent, DocumentUploadComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FinalUserComponentsModule {}
