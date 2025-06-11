import { Component } from '@angular/core';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { IAlarmModel } from '@speed/common/interfaces/forms';
import { IHcAlarma, IInterested } from '@speed/common/interfaces/output';
import { SpinnerOverlayService, CommunicateInterestedService, MantAlarmsService } from '@speed/common/services';
import { of, debounceTime, distinctUntilChanged, takeUntil, switchMap, Subject } from 'rxjs';

@Component({
  selector: 'ui-alarm-record-modal-container',
  templateUrl: 'alarm-record-modal.container.html',
  providers: [CommunicateInterestedService, MantAlarmsService],
})
export class AlarmRecordModalContainer {
  public listUsers: Array<IInterested> = [];
  public idDocumentoLegal?: number;
  public alarmEdit?: IAlarmModel;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogConfig: DialogConfig<{ idDocumentoLegal: number; alarmEdit?: IAlarmModel }>,
    private dialogRef: DialogRef<boolean>,
    private communicateService: CommunicateInterestedService,
    private mantAlarmService: MantAlarmsService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.idDocumentoLegal = this.dialogConfig.data?.idDocumentoLegal;
    this.alarmEdit = this.dialogConfig.data?.alarmEdit;
    this.unsubscribe = new Subject();
  }

  public onClickedClose() {
    this.dialogRef.close();
  }

  public searchUsersByName(name: string) {
    of(name)
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe),
        switchMap((value) => this.communicateService.buscarInteresados(value)),
      )
      .subscribe((data) => {
        this.listUsers = data;
      });
  }

  public saveAlarm(formValues: IAlarmModel) {
    this.spinnerService.show();
    this.mantAlarmService
      .saveAlarma(formValues)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.spinnerService.hide();
        },
      });
  }
}
