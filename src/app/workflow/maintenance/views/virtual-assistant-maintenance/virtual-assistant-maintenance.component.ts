import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IAreaPregunta, IPregunta } from '@speed/common/interfaces';
import { VirtualAssistantMaintenanceService } from '../../common/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { ActionModal } from '@speed/common/enums';
import { Subject, takeUntil } from 'rxjs';
import { VirtualAssistantQuestionModalComponent } from '@speed/common/modals';
import { Table } from 'primeng/table';
import { SpinnerOverlayService } from '@speed/common/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';
@Component({
  selector: 'app-virtual-assistant-maintenance',
  templateUrl: './virtual-assistant-maintenance.component.html',
  styleUrls: ['./virtual-assistant-maintenance.component.scss'],
  providers: [VirtualAssistantMaintenanceService],
})
export class VirtualAssistantMaintenanceComponent implements OnInit, OnDestroy {
  public areas: Array<IAreaPregunta> = [];
  public data: Array<IPregunta> = [];
  public filterFrom!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private assistantService: VirtualAssistantMaintenanceService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.unsubscribe = new Subject();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  public selectArea(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.filterFrom.get('codArea')?.setValue(id);
  }
  public openModalRegistrar() {
    this.dialogService
      .show({
        component: VirtualAssistantQuestionModalComponent,
        config: {
          data: {
            areas: this.areas,
            actionType: ActionModal.REGISTRAR,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async () => {
        try {
          this.submit();
        } catch (err) {
          console.error(err);
        }
      });
  }
  public openModalEditar(id: number) {
    this.dialogService
      .show({
        component: VirtualAssistantQuestionModalComponent,
        config: {
          data: {
            areas: this.areas,
            actionType: ActionModal.EDITAR,
            idPregunta: id,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async () => {
        try {
          this.submit();
        } catch (err) {
          console.error(err);
        }
      });
  }

  public async ngOnInit() {
    this.filterFrom = this.fb.group({
      codArea: [null],
    });
    this.cachedData = this.cacheService.get('Asistente Virtual');
    if (this.cachedData && this.cachedData.areas && this.cachedData.data) {
      this.areas = this.cachedData.areas;
      this.filterFrom.get('codArea')?.setValue(this.areas[0].codigoArea);
      this.data = this.cachedData.data;
    }
    else {
      this.spinnerService.show();
      this.cachedData = {};
      this.areas = await this.assistantService.getAreas();
      this.cachedData.areas = this.areas;
      this.filterFrom.get('codArea')?.setValue(this.areas[0].codigoArea);
      this.data = await this.assistantService.getPreguntasByArea(this.filterFrom.value);
      this.cachedData.data = this.data;

      this.cacheService.set('Asistente Virtual', this.cachedData);
      this.spinnerService.hide();
    }
  }

  public async submit() {
    const params = { ...this.filterFrom.value };
    if (params.codArea == '') {
      params.codArea = 0;
    }
    this.data = [];
    this.data = await this.assistantService.getPreguntasByArea(params);
    this.cachedData.data = this.data;
    this.cacheService.set('Asistente Virtual', this.cachedData);
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
