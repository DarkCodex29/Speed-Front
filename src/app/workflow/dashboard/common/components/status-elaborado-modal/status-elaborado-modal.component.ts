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
    if (!this.dataSolicitudesGeneralesElaborado || this.dataSolicitudesGeneralesElaborado.length === 0) {
      return 0;
    }
    return this.dataSolicitudesGeneralesElaborado.reduce((sum, item) => sum + (item.cantidad || 0), 0);
  }

  public viewDetails(val: number) {
    this.valDetail.emit(val);
  }

  public trackByFn(index: number, item: ISolicitudesGeneralesElaborado): number {
    return item.idUbicacion || index;
  }
}
