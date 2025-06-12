import { AfterContentInit, Component, ComponentFactoryResolver, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { DynamicTabsDirective } from '../../dynamic-tabs.directive';
import { Route, Router } from '@angular/router';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';

@Component({
  selector: 'ui-tabs-component',
  templateUrl: 'tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) public tabs!: QueryList<TabComponent>;
  @ViewChild(DynamicTabsDirective) public dynamicTabPlaceholder!: DynamicTabsDirective;
  public dynamicTabs: TabComponent[] = [];

  public constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private cacheService: WorkflowTabCacheService,
    private workflowTabService: WorkflowTabService,
  ) {}

  public ngAfterContentInit() {
    // obtener todas las pestañas activas
    const activeTabs = this.tabs.filter((tab) => tab.active);

    // si no hay un conjunto de pestañas activo, active el primero
    if (activeTabs.length === 0 && this.tabs.first) {
      this.selectTab(this.tabs.first);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public openTab(title: string, template: any, data: any, isCloseable = false) {
    const hasTabIndex = this.dynamicTabs.findIndex((tab) => tab.dataContext.id === data.id);

    if (hasTabIndex !== -1) {
      this.selectTab(this.dynamicTabs[hasTabIndex]);
    } else {
      // obtener una fábrica de componentes para nuestro TabComponent
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);

      // obtenga la referencia del contenedor de vista de nuestra directiva de anclaje
      const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

      // crear una instancia de componente
      const componentRef = viewContainerRef.createComponent(componentFactory);

      // establecer las propiedades correspondientes en nuestra instancia de componente
      const instance: TabComponent = componentRef.instance as TabComponent;
      instance.title = title;
      instance.template = template;
      instance.dataContext = data;
      instance.isCloseable = isCloseable;

      // recuerde el componente dinámico para representar
      // los encabezados de navegación de pestañas
      this.dynamicTabs.push(componentRef.instance as TabComponent);

      // ponerlo activo
      this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
  }

  public selectTab(tab: TabComponent) {
    if (tab.dataContext.linkOpcion) {
      this.router.navigateByUrl('/speed/' + tab.dataContext.linkOpcion);
    }
    if (tab.dataContext.linkDashboard) {
      this.router.navigateByUrl('/speed');
    }

    // desactivar todas las pestañas
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    this.dynamicTabs.forEach((tab) => (tab.active = false));

    // activar la pestaña en la que el usuario ha hecho clic.
    tab.active = true;

    this.workflowTabService.setActiveTab(tab);
  }

  public closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        // eliminar la pestaña de nuestra matriz
        this.dynamicTabs.splice(i, 1);

        // destruir nuestro componente creado dinámicamente de nuevo
        const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        viewContainerRef.remove(i);

        this.cacheService.clear(tab.title);
        this.validateCloseExternal(i);
        // establecer el índice de tabulación en el primero

        break;
      }
    }
  }

  public closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter((tab) => tab.active);
    if (activeTabs.length > 0) {
      // cerrar la primera pestaña activa (solo debe ser una a la vez)
      this.closeTab(activeTabs[0]);
    }
  }

  public validateCloseExternal(i: number) {
    const externalTab = this.dynamicTabs.find((tab) => tab.title === 'External');
    if (this.dynamicTabs.length === 2 && externalTab) {
      this.closeTab(externalTab);
    } else {
      const nextTab = this.dynamicTabs[i] ?? this.dynamicTabs[i - 1];
      if (nextTab) {
        this.selectTab(nextTab);
      } else {
        this.workflowTabService.setActiveTab(null);
      }
    }
  }
}
