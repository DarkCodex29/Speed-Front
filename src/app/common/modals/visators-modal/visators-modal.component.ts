import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogRef, DialogConfig } from '@speed/common/dialog';
import { SpinnerOverlayService } from '@speed/common/services';
import { VisatorService } from '@speed/final-user/common/services/visator.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgFor, NgIf],
  selector: 'app-visators-modal',
  templateUrl: './visators-modal.component.html',
  styleUrls: ['./visators-modal.component.scss'],
  providers: [VisatorService],
})
export class VisatorsModalComponent implements OnInit {
  public idExpediente?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tableVisators: any[] = [];
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig<number>,
    private spinnerService: SpinnerOverlayService,
    private visatorService: VisatorService,
  ) {
    this.unsubscribe = new Subject();
    this.idExpediente = this.dialogConfig.data;
  }

  public close() {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.spinnerService.show();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.visatorService
      .getVisadores(Number(this.idExpediente))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.tableVisators = data;
        this.spinnerService.hide();
      });
  }
}
