import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITabModel } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService, InboxService } from '@speed/final-user/common/services';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-detail-container',
  templateUrl: './contract-detail-external.container.html',
  providers: [ComboDataService, InboxService],
})
export class ContractDetailExternalContainer implements OnInit {
  public contract!: ITabModel;
  public loading = true;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  public constructor(
    private spinnerService: SpinnerOverlayService,
    private inboxService: InboxService,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
  ) {}

  public async ngOnInit() {
    const idTraza: string = localStorage.getItem('idTraza') || '';
    if (idTraza && idTraza !== '') {
      this.spinnerService.show();
      this.contract = await this.inboxService.obtenerDatosBasicosExpediente(idTraza);
      this.spinnerService.hide();
      this.loading = false;
      this.cdref.detectChanges();
      localStorage.removeItem('urlExternal');
      localStorage.removeItem('idTraza');
    }
  }
}
