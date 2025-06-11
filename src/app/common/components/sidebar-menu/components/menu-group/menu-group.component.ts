import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Opciones, SubOpciones } from 'src/app/authentication/interfaces';

@Component({
  selector: 'ui-menu-group',
  templateUrl: 'menu-group.component.html',
})
export class MenuGroupComponent {
  @Input() public opciones!: Opciones[] | SubOpciones[];
  @Output() private collapseOtherMenu: EventEmitter<number>;
  @Output() private optionClicked: EventEmitter<Opciones | SubOpciones>;


  public constructor() {
    this.collapseOtherMenu = new EventEmitter();
    this.optionClicked = new EventEmitter();
  }

  public toggleMenu(idMenuItem:number) {
    this.opciones.forEach((item) => {
      if (item.id !== idMenuItem) {
        item.expanded = false;
      }else{
        item.expanded = !item.expanded;
      }
    });
  }

  public toggleMenu2(idMenuItem:number, menuItemSubOpciones:Opciones[]) {
    menuItemSubOpciones.forEach((item:Opciones) => {
      if (item.id !== idMenuItem) {
        item.expanded = false;
      }else{
        item.expanded = !item.expanded;
      }
    });
  }
  public optionClick(option: Opciones | SubOpciones) {
    this.optionClicked.emit(option)
  }

  // public collapseOtherMenuC(idMenu: number, subOpciones: Opciones[]) {
  //   subOpciones.forEach((item:Opciones) => {
  //     if (item.id !== idMenu) {
  //       item.expanded = false;
  //     }
  //   });
  // }
}
