import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialogRef, DialogConfig } from '@speed/common/dialog';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgFor, NgIf],
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss'],
})
export class ReportModalComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tableVisators: any[] = [];
  public showReporte = false;
  public urlReporte!: SafeResourceUrl;
  public data: any;
  private unsubscribe: Subject<void>;
  public constructor(
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
    private spinnerService: SpinnerOverlayService,
    private domSanitizer: DomSanitizer,
  ) {
    this.unsubscribe = new Subject();
    this.data = this.dialogConfig.data || {};
  }

  public close() {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.spinnerService.show();
    const url = this.data.url;
    this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    this.spinnerService.hide();
    this.showReporte = true;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  }
}
