import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-spinner-overlay',
  templateUrl: 'spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss'],
})
export class SpinnerOverlayComponent {
  @Input() public message?: string;
}
