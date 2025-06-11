import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Opciones, SubOpciones } from '../authentication/interfaces';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';

@Injectable({
    providedIn: 'root',
})
export class WorkflowTabService {

    private _optionClicked = new BehaviorSubject<Opciones | SubOpciones | null>(null);
    optionClicked = this._optionClicked.asObservable();
    private tabsComponent = new BehaviorSubject<TabsComponent | null>(null);
    tabsComponent$ = this.tabsComponent.asObservable();

    constructor() { }

    optionSelect(opcion: Opciones | SubOpciones | null) {
        if (opcion != null) {
            this._optionClicked.next(opcion)
        }
    }

    public setTabsComponent(component: TabsComponent) {
        if (component) {
            this.tabsComponent.next(component)
        }
    }

}