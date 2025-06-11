import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse, Opciones, SubOpciones } from 'src/app/authentication/interfaces';
import { LoginService } from 'src/app/authentication/services';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  providers: [LoginService],
})
export class SidebarMenuComponent {
  @Output() public toggleMenu;
  @Output() public optionSelect;

  public listaOpciones: Opciones[] = [];
  public userInfo: LoginResponse = {};

  public constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.toggleMenu = new EventEmitter();
    this.optionSelect = new EventEmitter();
    this.userInfo = this.loginService.getUserInfo();
    this.listaOpciones = this.loginService.listaOpciones;
    const pathInit = this.router.url.replace('/speed/', '');
    this.activeMenuByURL(pathInit);
  }

  public toggleSidebar() {
    this.toggleMenu.emit();
  }

  public collapseOtherMenu(idMenu: number) {
    this.listaOpciones.forEach((item) => {
      if (item.id !== idMenu) {
        item.expanded = false;
      }
    });
  }

  public optionSelected(opcion: Opciones | SubOpciones) {
    this.optionSelect.emit(opcion);
  }



  public logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  private activeMenuByURL(urlActive: string) {
    const indexMenu = this.listaOpciones.findIndex((item) => {
      return item.subOpciones && item.subOpciones?.findIndex((subitem) => subitem.linkOpcion === urlActive) > -1 ? true : false;
    });
    if (indexMenu > -1) {
      this.listaOpciones[indexMenu].expanded = true;
     // this.optionSelect.emit(this.listaOpciones[indexMenu])
    }
    // if (urlActive == '/speed') {
    //   const tabDashboard :Opciones={
    //     id: 0,
    //     nombre: 'Dashboard',
    //     linkOpcion: urlActive,
    //     subOpciones: [],
    //     expanded: false
    //   } 
    //   this.optionSelect.emit(tabDashboard)
    //}
  }

  selectedItem: any;
  listClick(event: any, newValue: any) {
    console.log(newValue);
    this.selectedItem = newValue;
    newValue.showSubfolders = !newValue.showSubfolders
    event.stopPropagation()
  }
}
