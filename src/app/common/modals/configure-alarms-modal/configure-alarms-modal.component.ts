import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { IHcAlarma } from '@speed/common/interfaces/output';
import { Subject, takeUntil } from 'rxjs';
import { AlarmRecordModalContainer } from '../alarm-record-modal';
import { SpinnerOverlayService, MantAlarmsService } from '@speed/common/services';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IAlarmModel } from '@speed/common/interfaces/forms';

@Component({
  standalone: true,
  selector: 'ui-configure-alarms-modal',
  templateUrl: 'configure-alarms-modal.component.html',
  styleUrls: ['./configure-alarms-modal.component.scss'],
  imports: [NgIf, NgFor, DatePipe, TableModule, InputTextModule],
  providers: [MantAlarmsService],
})
export class ConfigureAlarmsModalComponent implements OnInit, OnDestroy {
  public listAlarms: Array<IAlarmModel> = [];
  private idDocumentoLegal?: number;
  private idExpediente?: number;
  private unsubscribe: Subject<void> = new Subject();

  public constructor(
    private dialogService: DialogService,
    private dialogRef: DialogRef,
    private dialogConfig: DialogConfig<{ idDocumentoLegal: number; idExpediente: number }>,
    private mantAlarmsService: MantAlarmsService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.idDocumentoLegal = this.dialogConfig.data?.idDocumentoLegal;
    this.idExpediente = this.dialogConfig.data?.idExpediente;
  }

  public ngOnInit() {
    this.getAlarms();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    this.dialogRef.close();
  }

  public onClickedRegistrarAlarma() {
    this.dialogService
      .show({
        component: AlarmRecordModalContainer,
        config: {
          data: {
            idDocumentoLegal: this.idDocumentoLegal,
          },
        },
      })
      .afterClosed.pipe()
      .subscribe((response) => {
        if (response) {
          this.getAlarms();
        }
      });
  }

  public onClickedEditarAlarma(alarma: IAlarmModel) {
    this.dialogService
      .show({
        component: AlarmRecordModalContainer,
        config: {
          data: {
            idDocumentoLegal: this.idDocumentoLegal,
            alarmEdit: alarma,
          },
        },
      })
      .afterClosed.pipe()
      .subscribe((response) => {
        if (response) {
          this.getAlarms();
        }
      });
  }

  private getAlarms() {
    this.spinnerService.show();
    this.listAlarms = [];
    this.mantAlarmsService
      .getAlarmas(Number(this.idExpediente))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.spinnerService.hide();
        this.listAlarms = data?.alarmas;
      });
  }
}
