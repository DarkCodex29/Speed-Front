import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  imports: [NgIf, NgFor, NgClass],
})
export class AutocompleteInputComponent implements OnChanges {
  @ViewChild('inputSearch') public inputSearch!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public dataList: any = [];
  @Input() public labelItem = 'name';
  @Input() public isAsync = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public value: any;
  @Input() public isInvalid = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() public selectItem: EventEmitter<any>;
  @Output() public changeValue: EventEmitter<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filteredResults: any = [];
  public activeIndex = 0;

  public constructor() {
    this.selectItem = new EventEmitter();
    this.changeValue = new EventEmitter();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.isAsync && changes['dataList']?.currentValue.length > 0) {
      this.filteredResults = changes['dataList'].currentValue;
    }
    if (changes['value']?.currentValue) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const object = this.dataList.find((item: any) => item.id === changes['value']?.currentValue);
      this.inputSearch.nativeElement.value = object[this.labelItem];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchForMatches(element: any) {
    const value = element.target.value;
    if (this.isAsync) {
      this.changeValue.emit(value);
    } else {
      if (value.length > 2) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.filteredResults = this.dataList.filter((data: any) => {
          return data[this.labelItem]?.toLowerCase().includes(value.toLowerCase());
        });
      } else {
        this.filteredResults = [];
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleResultClick(item: any) {
    if (item) {
      this.inputSearch.nativeElement.value = item[this.labelItem];
      this.filteredResults = [];
      this.activeIndex = 0;
      this.selectItem.emit(item);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleSelectItem(event: any) {
    const { key } = event;
    switch (key) {
      case 'Backspace':
        return;
      case 'Escape':
        this.filteredResults = [];
        this.inputSearch.nativeElement.value = '';
        return;
      case 'ArrowUp': {
        if (this.activeIndex === 0) {
          this.activeIndex = this.filteredResults.length - 1;
          return;
        }
        this.activeIndex--;
        break;
      }
      case 'ArrowDown': {
        if (this.activeIndex === this.filteredResults.length - 1) {
          this.activeIndex = 0;
          return;
        }
        this.activeIndex++;
        break;
      }
      case 'Enter': {
        this.handleResultClick(this.filteredResults[this.activeIndex]);
        break;
      }
      default:
        return;
    }
  }

  @HostListener('document:click', ['$event.target'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onClick(target: any) {
    if (target.className !== 'autocomplete-list' || target.className !== 'autocomplete-list-item') {
      this.filteredResults = [];
      this.activeIndex = 0;
    }
  }
}
