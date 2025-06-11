import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { ModalBaseComponent } from './modal-base/modal-base.component';
import { DialogInjector } from './dialog.injector';
import { DialogRef } from './dialog.ref';

export class DialogConfig<D = unknown> {
  public backdrop?: boolean;
  public title?: string;
  public message?: string;
  public data?: D;
  public className?: string;
  public isClosed?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /**
   * View container ref of dialog service
   */
  public viewContainerRef!: ViewContainerRef;
  /**
   * Components references of dialog service
   */
  public componentsReferences = Array<ComponentRef<ModalBaseComponent>>();
  /**
   * Child unique key of dialog service
   */
  private childUniqueKey = 0;

  public constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public show<T>(data: { component?: Type<T>; config?: DialogConfig }): DialogRef<unknown> {
    const config = Object.assign({ backdrop: true }, data.config);
    const dialogRef = this.appendComponent(config, data.component);

    return dialogRef;
  }

  /**
   * Appends component
   * @template T
   * @param config DialogConfig
   * @param [componentType] Type<T>
   * @returns DialogRef<unknown>
   */
  private appendComponent<T>(config: DialogConfig, componentType?: Type<T>) {
    const { dialogRef, componentRef } = this.componentRef(config);

    const component = this.childComponentType<T>(componentRef, componentType);

    Object.assign(component, config);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeElement(componentRef);
      sub.unsubscribe();
    });

    this.componentsReferences.push(componentRef);

    return dialogRef;
  }

  /**
   * Components ref
   * @template T
   * @param config DialogConfig<T>
   * @returns ref ComponentRef<ModalBaseComponent>
   */
  private componentRef<T>(config: DialogConfig<T>): {
    dialogRef: DialogRef<T>;
    componentRef: ComponentRef<ModalBaseComponent>;
  } {
    const map = new WeakMap();

    map.set(DialogConfig<T>, config);

    const dialogRef = new DialogRef<T>();

    map.set(DialogRef<T>, dialogRef);

    const componentRef = this.viewContainerRef.createComponent(ModalBaseComponent, { injector: new DialogInjector(this.injector, map) });

    return { dialogRef, componentRef };
  }

  /**
   * Childs component type
   * @template T
   * @param componentRef ComponentRef<ModalBaseComponent>
   * @param [componentType] Type<T>
   * @returns ModalBaseComponent
   */
  private childComponentType<T>(componentRef: ComponentRef<ModalBaseComponent>, componentType?: Type<T>): ModalBaseComponent {
    const component = componentRef.instance;

    component.uniqueKey = ++this.childUniqueKey;

    if (componentType) {
      component.childComponentType = componentType;
    }

    return component;
  }

  /**
   * Removes element
   * @param componentRef ComponentRef<ModalBaseComponent> | undefined
   */
  private removeElement(componentRef: ComponentRef<ModalBaseComponent> | undefined): void {
    if (componentRef) {
      const modalViewRef = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement | undefined;

      if (modalViewRef) {
        const dialog = modalViewRef.querySelector('.speed-modal-content');

        dialog?.classList.add('speed-modal-removed');

        // eslint-disable-next-line
        const animationend = (e: any) => {
          if (e.animationName.indexOf('dialogBounceOut')) {
            this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();

            modalViewRef.remove();
          }
        };

        this.document.body.addEventListener('animationend', animationend, false);

        this.document.body.addEventListener('webkitAnimationEnd', animationend, false);
      }
    }
  }
}
