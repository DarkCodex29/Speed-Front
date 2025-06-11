import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { ProfileService } from '@speed/final-user/common/services/profile.service';
import { ProfileBD } from '@speed/common/interfaces/profile.interface';
import { ProfileMaintenanceModalComponent } from '@speed/common/modals/profile-maintenance-modal/profile-maintenance-modal.component';
import { MessageModalComponent } from '@speed/common/modals';
import { ActionModal } from '@speed/common/enums';

@Component({
  selector: 'app-profile-maintenance',
  templateUrl: './profile-maintenance.component.html',
  styleUrls: ['./profile-maintenance.component.scss'],
  providers: [ProfileService],
})
export class ProfileMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<ProfileBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;

  public constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.filterForm = this.fb.group({
      nombre: null,
    });
    this.unsubscribe = new Subject();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public openModalRegistrar() {
    this.dialogService
      .show({
        component: ProfileMaintenanceModalComponent,
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe((action) => {
        const response = action as { modified: boolean };
        try {
          if (response.modified) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Se registró correctamente',
                },
              },
            });
            this.submit();
          }
          //Preugntar si hay un modal de exito
        } catch (err) {
          console.error(err);
        }
      });
  }

  public openEditPerfil(id: number) {
    this.dialogService
      .show({
        component: ProfileMaintenanceModalComponent,
        config: {
          data: {
            id: id,
            actionType: ActionModal.EDITAR,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean };
        try {
          if (response.modified) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Se editó correctamente',
                },
              },
            });
            this.submit();
          }
        } catch (err) {
          console.error(err);
        }
      });
  }

  public async ngOnInit() {
    this.data = [];
    const dataSpeed = JSON.parse(localStorage.getItem('dataSpeed') ?? '');
    if (dataSpeed != null) {
      const index = dataSpeed.findIndex((tab: any) => tab.title.includes('Perfiles'))
      if (index > -1) {
        if (dataSpeed[index].dataTab != null && dataSpeed[index].dataTab.data) {
          this.data = dataSpeed[index].dataTab.data;
        } else {
          this.spinnerService.show();
          dataSpeed[index].dataTab = {};
          this.data = await this.profileService.getPerfiles(this.filterForm.value);
          dataSpeed[index].dataTab.data = this.data;
          localStorage.setItem('dataSpeed', JSON.stringify(dataSpeed));
          this.spinnerService.hide();
        }
      }
    }
  }

  public async clean() {
    this.data = [];
    this.filterForm.get('nombre')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.profileService.getPerfiles(this.filterForm.value);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.profileService.getPerfiles(this.filterForm.value);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
