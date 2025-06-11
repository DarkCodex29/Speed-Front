import { NgModule } from '@angular/core';
import { ContractDetailComponent } from './contract-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlarmRecordModalModule } from '@speed/common/modals/alarm-record-modal';
import { CommunicateStakeholdersModule } from '@speed/common/modals/communicate-stakeholders-modal';
import { EditorModule } from 'primeng/editor';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AlarmRecordModalModule, CommunicateStakeholdersModule, EditorModule, FormsModule],
  declarations: [ContractDetailComponent],
  exports: [ContractDetailComponent],
})
export class ContractDetailModule {}
