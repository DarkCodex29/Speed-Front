import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ICounterPartBD, ICounterPartTypeBD } from '@speed/common/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { ActionModal } from '@speed/common/enums';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { ClientService } from '@speed/final-user/common/services/client.service';
import { ClientMaintenanceModalComponent } from '@speed/common/modals/client-maintenance-modal/client-maintenance-modal.component';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';
@Component({
  selector: 'app-client-maintenance',
  templateUrl: './client-maintenance.component.html',
  styleUrls: ['./client-maintenance.component.scss'],
  providers: [ClientService],
})
export class ClientMaintenanceComponent implements OnInit, OnDestroy {
  public visible = false;
  public data: Array<ICounterPartBD> = [];
  public filterForm!: FormGroup;
  public listTipos: Array<ICounterPartTypeBD> = [];
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;
  public constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.filterForm = this.fb.group({
      idTipo: [''],
      filtroRazonSocial: [''],
      filtroCorreo: [''],
      filtroNumDocumento: [''],
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
        component: ClientMaintenanceModalComponent,
        config: {
          data: {
            actionType: ActionModal.REGISTRAR,
          },
        },
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

  public openEditCliente(id: number) {
    this.dialogService
      .show({
        component: ClientMaintenanceModalComponent,
        config: {
          data: {
            actionType: ActionModal.EDITAR,
            idCliente: id,
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
                  message: 'Se guardó correctamente',
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
    this.cachedData = this.cacheService.get('Clientes');
    if (this.cachedData && this.cachedData.listTipos && this.cachedData.data) {
      this.data = [];
      this.visible = false;
      this.listTipos = this.cachedData.listTipos;
      this.data = this.cachedData.data;
      this.visible = true;
    }
    else {
      this.cachedData = {};
      this.spinnerService.show();
      this.data = [];
      this.visible = false;
      this.listTipos = await this.clientService.getTipos();
      this.cachedData.listTipos = this.listTipos;
      this.data = await this.clientService.getClientesAll();
      this.cachedData.data = this.data;
      this.cacheService.set('Clientes', this.cachedData);
      setTimeout(() => {
        this.visible = true;
        this.spinnerService.hide();
      }, 1500);
    }
  }

  public async clean() {
    this.data = [];

    this.filterForm.get('idTipo')?.setValue('');
    this.filterForm.get('filtroRazonSocial')?.setValue('');
    this.filterForm.get('filtroCorreo')?.setValue('');
    this.filterForm.get('filtroNumDocumento')?.setValue('');

    this.data = [];
    this.visible = false;
    this.spinnerService.show();
    this.data = await this.clientService.getClientesAll();
    this.cachedData.data = this.data;
    this.cacheService.set('Clientes', this.cachedData);
    setTimeout(() => {
      this.visible = true;
      this.spinnerService.hide();
    }, 1500);
  }

  public async submit() {
    this.data = [];
    this.visible = false;
    this.spinnerService.show();
    this.data = await this.clientService.getClientes(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Clientes', this.cachedData);
    setTimeout(() => {
      this.visible = true;
      this.spinnerService.hide();
    }, 1500);
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
