import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from '../authentication/services';
import { LoginResponse, Opciones, SubOpciones } from '../authentication/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { WorkflowTabService } from './workflow-tab-service';
import { Subject } from 'rxjs';
import { TabService } from './final-user/common/services/tab.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  providers: [LoginService],
})
export class WorkflowComponent implements AfterViewInit, OnDestroy {
  public sidebarMini = false;
  public userInfo: LoginResponse = {};

  optionsClicked: Opciones[] | SubOpciones[] = [];
  @ViewChild(TabsComponent) public tabsComponent!: TabsComponent;
  @ViewChild('tab') public tabTemplate!: TemplateRef<unknown>;
  @ViewChild('dasboardTab') public dasboardTabTemplate!: TemplateRef<unknown>;
  public listaOpciones: Opciones[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();

  public constructor(
    private loginService: LoginService,
    private router: Router,
    private workflowTabService: WorkflowTabService,
    private tabServices: TabService,
  ) {
    this.userInfo = loginService.getUserInfo();
    this.listaOpciones = this.loginService.listaOpciones;
  }

  public ngAfterViewInit() {
    this.workflowTabService.setTabsComponent(this.tabsComponent);
    this.loadTabsIni();
    this.tabServices.obtener().subscribe((x) => {
      this.optionClicked(x);
    });
  }

  public loadTabsIni(): void {
    this.openTabAsync('Dashboard', this.dasboardTabTemplate, { id: 0, linkDashboard: '/speed' }, false)
      .then(() => {
        this.workflowTabService.setActiveTab({
          title: 'Dashboard',
          dataContext: { id: 0, linkDashboard: true, linkOpcion: '/speed' },
          active: true,
        } as any);

        return new Promise<void>((resolve) => {
          setTimeout(() => {
            const urlExternal: string = localStorage.getItem('urlExternal') || '';
            if (urlExternal && urlExternal !== '' && urlExternal) {
              const opcion = {
                id: 9999,
                idPadre: null,
                nombre: 'External',
                linkOpcion: 'final-user/contract-detail-external',
                subOpciones: [],
              };

              this.tabsComponent.openTab(opcion.nombre ?? '', this.tabTemplate, { id: opcion.id, linkOpcion: opcion.linkOpcion }, true);
            }
          }, 2500);
          resolve();
        });
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }

  public openTabAsync(tabName: string, template: any, options: any, isClosable: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.tabsComponent.openTab(tabName, template, options, isClosable);
        resolve(); // Resolviendo la promesa cuando el tab se abre correctamente
      } catch (error) {
        reject(error); // Rechazando la promesa si hay un error
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public toggleSidebar() {
    this.sidebarMini = !this.sidebarMini;
  }

  public optionClicked(opcion: Opciones | SubOpciones) {
    if (opcion.id === 0 || opcion.linkOpcion === '/speed') {
      this.tabsComponent.selectTab(this.tabsComponent.tabs.first);
      this.workflowTabService.setActiveTab({
        title: 'Dashboard',
        dataContext: { id: 0, linkDashboard: true, linkOpcion: '/speed' },
        active: true,
      } as any);
    } else {
      this.tabsComponent.openTab(opcion.nombre ?? '', this.tabTemplate, { id: opcion.id, linkOpcion: opcion.linkOpcion }, true);
    }
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
      const index = this.listaOpciones[indexMenu].subOpciones?.findIndex((subitem) => subitem.linkOpcion === urlActive);
      if (index && index > -1) {
        const tab = this.listaOpciones[indexMenu].subOpciones?.[index];
        if (tab) this.optionClicked(tab);
      }
    }
  }
}
