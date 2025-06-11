import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DialogDirective } from '../dialog.directive';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'ui-modal-init',
  templateUrl: './modal-init.component.html',
  styleUrls: ['./modal-init.component.scss'],
})
export class DialogInitComponent implements AfterViewInit {
  /**
   * View child assi hodst of dialog init component
   */
  @ViewChild(DialogDirective, { static: true }) public speedHost!: DialogDirective;

  /**
   * Creates an instance of dialog init component.
   * @param dialogService DialogService
   */
  public constructor(private dialogService: DialogService) {}

  /**
   * After view init
   */
  public ngAfterViewInit(): void {
    this.dialogService.viewContainerRef = this.speedHost.viewContainerRef;
  }
}
