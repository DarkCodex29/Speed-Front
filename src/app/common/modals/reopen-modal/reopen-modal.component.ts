import { NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { Utils } from '@speed/common/helpers';
import { ReopenExpedientService, SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { DialogConfig } from '../../dialog/dialog.service';

@Component({
  standalone: true,
  selector: 'app-reopen-modal',
  templateUrl: './reopen-modal.component.html',
  styleUrls: ['./reopen-modal.component.scss'],
  imports: [NgIf, CustomReactiveFormDirective, ReactiveFormsModule],
  providers: [ReopenExpedientService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReopenModalComponent implements OnInit {
  public loading = true;
  public contrato = '';
  public idExpediente?;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public responsablesList: any;
  public requestForm!: FormGroup;
  private unsubscribe: Subject<void>;

  public constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
    private dataService: ReopenExpedientService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.idExpediente = this.dialogConfig.data || {};
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.loading = true;
    this.spinnerService.show();
    await this.recoverData();
    this.requestForm = this.fb.group({
      idExpediente: [this.idExpediente],
      idResponsable: [null, [Validators.required]],
      observacion: ['', [Validators.minLength(1), Validators.required]],
    });
  }

  public close() {
    const params = { success: true, message: '', modified: false };

    this.dialogRef.close(params);
  }
  public selectResponsible(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.requestForm.get('idResponsable')?.setValue(id);
  }
  public sendRequest() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const params = { ...this.requestForm.value };
      this.dataService
        .reabrir(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (response) => {
            const params = { success: true, message: response.message, modified: true };
            this.dialogRef.close(params);
          },
          error: (e) => {
            console.error(e.error.message);
            const params = { success: false, message: e.error.message, modified: true };
            this.dialogRef.close(params);
          },
        });
    }
  }

  private async recoverData() {
    try {
      const responses = await Promise.all([this.dataService.getAbogadosResponsables()]);
      this.responsablesList = responses[0];
      this.loading = false;
      this.spinnerService.hide();
    } catch (err) {
      console.error(err);
      this.loading = false;
      this.spinnerService.hide();
    }
  }
}
