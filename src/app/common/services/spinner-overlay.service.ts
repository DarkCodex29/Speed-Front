import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private overlayRef?: OverlayRef;

  constructor(private overlay: Overlay) {}

  public show(message?: string) {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    if (!this.overlayRef.hasAttached()) {
      const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
      const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
      component.instance.message = message;
    }
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
