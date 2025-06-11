import { NgModule } from '@angular/core';
import { DialogDirective } from './dialog.directive';
import { ModalBaseComponent } from './modal-base/modal-base.component';
import { DialogInitComponent } from './modal-init/modal-init.component';

@NgModule({
  declarations: [DialogDirective, ModalBaseComponent, DialogInitComponent],
  exports: [ModalBaseComponent, DialogInitComponent],
})
export class DialogModule {}
