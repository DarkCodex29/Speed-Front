import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Opciones, SubOpciones } from '../authentication/interfaces';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { TabComponent } from '@speed/common/tabs/components/tab/tab.component';

@Injectable({
  providedIn: 'root',
})
export class WorkflowTabService {
  private _optionClicked = new BehaviorSubject<Opciones | SubOpciones | null>(null);
  optionClicked = this._optionClicked.asObservable();
  private tabsComponent = new BehaviorSubject<TabsComponent | null>(null);
  tabsComponent$ = this.tabsComponent.asObservable();

  private _activeTab = new BehaviorSubject<TabComponent | null>(null);
  activeTab$ = this._activeTab.asObservable();

  constructor() {}

  optionSelect(opcion: Opciones | SubOpciones | null) {
    if (opcion != null) {
      this._optionClicked.next(opcion);
    }
  }

  public setTabsComponent(component: TabsComponent) {
    if (component) {
      this.tabsComponent.next(component);
    }
  }

  public setActiveTab(tab: TabComponent | null) {
    this._activeTab.next(tab);
    console.log('🎯 Pestaña activa cambió:', tab?.title);
  }

  public getCurrentActiveTab(): TabComponent | null {
    return this._activeTab.value;
  }
}
