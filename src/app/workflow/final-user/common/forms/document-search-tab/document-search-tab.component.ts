import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProcessType } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject } from 'rxjs';

import { IContract, ITabModel } from '@speed/common/interfaces';

@Component({
  selector: 'ui-document-search-tab',
  templateUrl: './document-search-tab.component.html',
  styleUrls: ['./document-search-tab.component.scss'],
  providers: [],
})
export class DocumentSearchTabComponent implements OnInit, OnDestroy {
  @Input() public tipo?: number;
  @Input() public idProceso?: number;

  @Input() public tabInfoDocument!: ITabModel | IContract;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() public readonly closeTab: EventEmitter<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() public readonly openVerDocumento: EventEmitter<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  @Output() public readonly reloadList: EventEmitter<boolean>;
  public tipoTab!: number;
  public isLoading = true;
  public requestForm!: FormGroup;
  public flagPenalidad = false;
  public flagVerificarInputs = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data?: any;

  public readonly enumProcessType = ProcessType;
  private unsubscribe: Subject<void>;

  public constructor(private spinnerService: SpinnerOverlayService) {
    this.closeTab = new EventEmitter();
    this.reloadList = new EventEmitter();
    this.openVerDocumento = new EventEmitter();
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.tipoTab = Number(this.tipo);
    this.isLoading = true;
    this.spinnerService.show();
    this.spinnerService.hide();
    this.isLoading = false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public closeTabTunnel(event: any) {
    this.closeTab.emit(event);
  }
  public reloadListTunnel(event: any) {
    this.reloadList.emit(event);
  }
  public openOtherTabTunnel(event: any) {
    this.openVerDocumento.emit(event);
  }
}
