import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Opciones, SubOpciones } from 'src/app/authentication/interfaces';

@Component({
  selector: 'ui-menu-group',
  templateUrl: './menu-group.component.html',
})
export class MenuGroupComponent {
  @Input() public opciones: Opciones[] = [];
  @Input() public isOptionActive: ((option: Opciones | SubOpciones) => boolean) | null = null;
  @Output() public collapseOtherMenu: EventEmitter<number> = new EventEmitter<number>();
  @Output() public optionClicked: EventEmitter<Opciones | SubOpciones> = new EventEmitter<Opciones | SubOpciones>();

  public constructor() {}

  public toggleMenu(menuId: number) {
    const menu = this.opciones.find((opcion) => opcion.id === menuId);
    if (menu) {
      menu.expanded = !menu.expanded;
      this.collapseOtherMenu.emit(menuId);
    }
  }

  public toggleMenu2(menuId: number, subOpciones: SubOpciones[]) {
    const menu = subOpciones.find((opcion) => opcion.id === menuId);
    if (menu) {
      menu.expanded = !menu.expanded;
    }
  }

  public optionClick(opcion: Opciones | SubOpciones) {
    this.optionClicked.emit(opcion);
  }

  // public collapseOtherMenuC(idMenu: number, subOpciones: Opciones[]) {
  //   subOpciones.forEach((item:Opciones) => {
  //     if (item.id !== idMenu) {
  //       item.expanded = false;
  //     }
  //   });
  // }
}
