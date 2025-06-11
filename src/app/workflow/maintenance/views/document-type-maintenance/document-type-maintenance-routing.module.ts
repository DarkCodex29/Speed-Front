import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTypeMaintenanceComponent } from './document-type-maintenance.component';

const routes: Routes = [{ path: '', component: DocumentTypeMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentTypeMaintenanceRoutingModule {}
