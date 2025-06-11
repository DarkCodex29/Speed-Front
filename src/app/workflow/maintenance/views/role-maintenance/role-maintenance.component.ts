import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { RolBD } from '@speed/common/interfaces/role.interface';
import { RoleService } from '@speed/final-user/common/services/role.service';
import { RoleMaintenanceModalComponent } from '@speed/common/modals/role-maintenance-modal/role-maintenance-modal.component';
import { ActionModal } from '@speed/common/enums';

@Component({
  selector: 'app-role-maintenance',
  templateUrl: './role-maintenance.component.html',
  styleUrls: ['./role-maintenance.component.scss'],
  providers: [RoleService],
})
export class RoleMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<RolBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;

  public constructor(
    private roleService: RoleService,
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
    // eslint-disable-next-line no-console
    console.log('ENTRO REGISTRAR');
    this.dialogService
      .show({
        component: RoleMaintenanceModalComponent,
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

  public openEditRole(id: number) {
    // eslint-disable-next-line no-console
    console.log('ENTRO EDIT');
    this.dialogService
      .show({
        component: RoleMaintenanceModalComponent,
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
      const index = dataSpeed.findIndex((tab: any) => tab.title.includes('Roles'))
      if (index > -1) {
        if (dataSpeed[index].dataTab != null && dataSpeed[index].dataTab.data) {
          this.data = dataSpeed[index].dataTab.data;
        } else {
          this.spinnerService.show();
          dataSpeed[index].dataTab = {};
          this.data = await this.roleService.getRoles(this.filterForm.value);
          dataSpeed[index].dataTab.data = this.data;
          localStorage.setItem('dataSpeed', JSON.stringify(dataSpeed));
          // eslint-disable-next-line no-console
          this.spinnerService.hide();
        }
      }
    }
  }

  public async clean() {
    this.data = [];
    this.filterForm.get('nombre')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.roleService.getRoles(this.filterForm.value);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.roleService.getRoles(this.filterForm.value);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
