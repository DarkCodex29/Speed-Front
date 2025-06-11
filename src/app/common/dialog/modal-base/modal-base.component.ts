import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Type,
  OnDestroy,
  AfterViewInit,
  ComponentRef,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { DialogDirective } from '../dialog.directive';

@Component({
  selector: 'ui-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss'],
})
export class ModalBaseComponent implements OnDestroy, AfterViewInit {
  @ViewChild(DialogDirective, { static: true }) public insertion!: DialogDirective;
  @Input() public uniqueKey!: number;
  @Input() public childComponentType?: Type<unknown>;
  public componentRef?: ComponentRef<unknown>;

  @Output() public closeEvent = new EventEmitter();
  @Output() public submitEvent = new EventEmitter();

  public constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  public ngAfterViewInit(): void {
    if (this.childComponentType) {
      this.loadChildComponent(this.childComponentType);
      this.cd.detectChanges();
    }
  }

  public loadChildComponent(componentType: Type<unknown>): void {
    const viewContainerRef = this.insertion.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentType);
    // this.componentRef.instance.data = this.data;
    // this.componentRef.instance.closeModal.subscribe(() => this.close());
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // this.componentRef.instance.submitModal.subscribe((event: any) => this.submit(event));
    // this.componentRef.hostView.detectChanges();
  }

  public close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public submit(event: any): void {
    // eslint-disable-next-line no-console
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(event);
  }
}
