import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginResponse, Opciones, SubOpciones } from 'src/app/authentication/interfaces';
import { LoginService } from 'src/app/authentication/services';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  providers: [LoginService],
})
export class SidebarMenuComponent implements OnInit, OnDestroy {
  @Output() public toggleMenu;
  @Output() public optionSelect;

  public listaOpciones: Opciones[] = [];
  public userInfo: LoginResponse = {};
  public activeOption: Opciones | SubOpciones | null = null;
  private destroy$ = new Subject<boolean>();

  public constructor(
    private loginService: LoginService,
    private router: Router,
    private workflowTabService: WorkflowTabService,
  ) {
    this.toggleMenu = new EventEmitter();
    this.optionSelect = new EventEmitter();
    this.userInfo = this.loginService.getUserInfo();
    this.listaOpciones = this.loginService.listaOpciones;
    const pathInit = this.router.url.replace('/speed/', '');
    this.activeMenuByURL(pathInit);
  }

  public ngOnInit() {
    this.workflowTabService.activeTab$.pipe(takeUntil(this.destroy$)).subscribe((activeTab) => {
      if (activeTab?.dataContext) {
        this.updateActiveOptionFromTab(activeTab.dataContext);
      } else if (!activeTab) {
        this.updateActiveOptionFromTab({ linkOpcion: '', linkDashboard: true });
      }
    });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
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
    this.activeOption = opcion;
    this.optionSelect.emit(opcion);
  }

  public logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  public isOptionActive(option: Opciones | SubOpciones): boolean {
    if (!this.activeOption) return false;

    if (option.id === 0 && option.linkOpcion === '/speed') {
      return this.activeOption.id === 0 || this.activeOption.linkOpcion === '/speed';
    }

    if (option.linkOpcion && this.activeOption.linkOpcion) {
      return option.linkOpcion === this.activeOption.linkOpcion;
    }

    return this.activeOption.id === option.id;
  }

  private updateActiveOptionFromTab(tabData: any) {
    console.log('🔄 Actualizando sidebar desde pestaña:', tabData);

    if (tabData.linkDashboard) {
      this.activeOption = {
        id: 0,
        nombre: 'Dashboard',
        linkOpcion: '/speed',
        subOpciones: [],
        expanded: false,
      };
      return;
    }

    if (tabData.linkOpcion) {
      const foundOption = this.findOptionByLink(tabData.linkOpcion);
      if (foundOption) {
        this.activeOption = foundOption;

        if (foundOption.parentOption) {
          foundOption.parentOption.expanded = true;
        }
        console.log('✅ Opción activa del sidebar:', foundOption.nombre);
      }
    }
  }

  private findOptionByLink(linkOpcion: string): ((Opciones | SubOpciones) & { parentOption?: Opciones }) | null {
    for (const opcion of this.listaOpciones) {
      if (opcion.linkOpcion === linkOpcion) {
        return opcion;
      }

      if (opcion.subOpciones) {
        for (const subOpcion of opcion.subOpciones) {
          if (subOpcion.linkOpcion === linkOpcion) {
            return { ...subOpcion, parentOption: opcion };
          }
        }
      }
    }
    return null;
  }

  private activeMenuByURL(urlActive: string) {
    const indexMenu = this.listaOpciones.findIndex((item) => {
      return item.subOpciones && item.subOpciones?.findIndex((subitem) => subitem.linkOpcion === urlActive) > -1 ? true : false;
    });
    if (indexMenu > -1) {
      this.listaOpciones[indexMenu].expanded = true;
    }
  }

  selectedItem: any;
  listClick(event: any, newValue: any) {
    console.log(newValue);
    this.selectedItem = newValue;
    newValue.showSubfolders = !newValue.showSubfolders;
    event.stopPropagation();
  }
}
