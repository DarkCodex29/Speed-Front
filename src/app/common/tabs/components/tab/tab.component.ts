import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ui-tab-component',
  templateUrl: 'tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnChanges  {
  @Input() public title = 'Tab Title';
  @Input() public active = false;
  @Input() public isCloseable = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public template: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public dataContext!: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataContext']) {
      console.log('dataContext ha cambiado:', this.dataContext);
    }
  }
}
