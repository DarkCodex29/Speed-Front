import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AlarmRecordModalContainer } from './alarm-record-modal.container';
import { AlarmRecordModalComponent } from './alarm-record-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CustomReactiveFormDirective, NumberOnlyDirective } from '@speed/common/directives';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective, QuillModule, NumberOnlyDirective, CheckboxModule],
  declarations: [AlarmRecordModalContainer, AlarmRecordModalComponent],
  exports: [AlarmRecordModalContainer, AlarmRecordModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlarmRecordModalModule {}
