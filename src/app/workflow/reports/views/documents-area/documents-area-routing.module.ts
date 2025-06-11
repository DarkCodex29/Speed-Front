import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsAreaComponent } from './documents-area.component';

const routes: Routes = [{ path: '', component: DocumentsAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsAreaRoutingModule {}
