import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { HolidayService } from '@speed/final-user/common/services/holiday.service';
import { HolidayModel } from '@speed/common/models/holiday.model';
import { SedeBD } from '@speed/common/interfaces/area.interface';
import { AreaService } from '@speed/final-user/common/services/area.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  standalone: true,
  selector: 'ui-holiday-modal',
  templateUrl: 'holiday-maintenance-modal.component.html',
  styleUrls: ['./holiday-maintenance-modal.component.scss'],
  providers: [HolidayService, AreaService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CalendarModule],
})
export class HolidayMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idHoliday?: number;
  public sedes: Array<SedeBD> = [];
  public holidayForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private holidayService: HolidayService,
    private areaService: AreaService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const holidayModel = new HolidayModel();
    this.holidayForm = new FormGroup({ ...holidayModel });
    this.idHoliday = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.holidayForm.get('contenido')?.disable();
    this.sedes = await this.areaService.getSedes();
    if (this.idHoliday) {
      await this.patchValue();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    const params = { modified: false };
    this.dialogRef.close(params);
  }

  public submit() {
    Utils.validateAllFields(this.holidayForm);
    if (this.holidayForm.valid) {
      try {
        const params = this.holidayForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.holidayService
          .registerFeriado(params)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            const params = { modified: true };
            this.dialogRef.close(params);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async patchValue() {
    const data = await this.holidayService.getFeriadoById(this.idHoliday as number);

    // eslint-disable-next-line no-console
    console.log(data);

    this.holidayForm.get('id')?.setValue(data.id);
    this.holidayForm.get('fecha')?.setValue(data.fecha);
    this.holidayForm.get('idSede')?.setValue(data.sede.id);
    this.holidayForm.get('estado')?.setValue(data.estado == 'A' ? true : false);
  }
}
