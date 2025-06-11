import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISolicitudesGeneralesElaborado } from '../../interfaces';

@Component({
  selector: 'app-status-elaborado-modal',
  templateUrl: './status-elaborado-modal.component.html',
  styleUrls: ['./status-elaborado-modal.component.scss'],
})
export class StatusElaboradoModalComponent {
  @Input() public dataSolicitudesGeneralesElaborado: ISolicitudesGeneralesElaborado[] = [];
  @Input() public porcentajeElaborado = 0;
  @Output() public closeModal = new EventEmitter<void>();
  @Output() public valDetail = new EventEmitter<number>();

  public closeModalF() {
    this.closeModal.emit();
  }

  public getTotalCantidad(): number {
    //console.log('yojim data:', this.dataSolicitudesGeneralesElaborado);
    return this.dataSolicitudesGeneralesElaborado.reduce((sum, item) => sum + item.cantidad, 0);
  }

  public viewDetails(val: number) {
    this.valDetail.emit(val);
  }
}
