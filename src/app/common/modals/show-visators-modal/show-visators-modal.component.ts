import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialogRef, DialogConfig } from '@speed/common/dialog';
import { SpinnerOverlayService } from '@speed/common/services';
import { environment } from '@speed/env/environment';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgFor, NgIf],
  selector: 'app-show-visators-modal',
  templateUrl: './show-visators-modal.component.html',
  styleUrls: ['./show-visators-modal.component.scss'],
})
export class ShowVisatorsModalComponent implements OnInit {
  public idDocumentoLegal?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tableVisators: any[] = [];
  public showReporte = false;
  public urlReporte!: SafeResourceUrl;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig<number>,
    private spinnerService: SpinnerOverlayService,
    private domSanitizer: DomSanitizer,
  ) {
    this.unsubscribe = new Subject();
    this.idDocumentoLegal = this.dialogConfig.data;
  }

  public close() {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.spinnerService.show();
    const url = String(environment.showVisatorsURL + '&rs:embed=true&rc:parameters=false' + '&id_documento_legal=' + this.idDocumentoLegal);
    this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    this.spinnerService.hide();
    this.showReporte = true;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  }
}
