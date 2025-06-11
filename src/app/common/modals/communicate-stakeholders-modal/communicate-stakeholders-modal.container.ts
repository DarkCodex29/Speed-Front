import { Component } from '@angular/core';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { ICommunicateStakeholdersForm } from '@speed/common/interfaces/forms';
import { IInterested } from '@speed/common/interfaces/output';
import { SpinnerOverlayService, CommunicateInterestedService } from '@speed/common/services';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { MessageModalComponent } from '../message-modal';

@Component({
  selector: 'ui-communicate-stakeholders-modal-container',
  templateUrl: 'communicate-stakeholders-modal.container.html',
  providers: [CommunicateInterestedService],
})
export class CommunicateStakeholdersContainer {
  public listUsers: Array<IInterested> = [];
  public idExpediente?: number;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogConfig: DialogConfig<number>,
    private dialogRef: DialogRef<boolean>,
    private dialogService: DialogService,
    private communicateService: CommunicateInterestedService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.idExpediente = this.dialogConfig.data;
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

  public notifyStakeholders(formValues: ICommunicateStakeholdersForm) {
    this.spinnerService.show();
    this.communicateService
      .enviarComunicaciones(formValues)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Se notificó a los interesados.',
              },
            },
          });
          this.spinnerService.hide();
        },
        error: () => {
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'No se pudo notificar a los interesados.',
              },
            },
          });
          this.spinnerService.hide();
        },
      });
  }
}
