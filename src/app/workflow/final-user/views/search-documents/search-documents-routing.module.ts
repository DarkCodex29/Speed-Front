import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDocumentsComponent } from './search-documents.component';

const routes: Routes = [{ path: '', component: SearchDocumentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchDocumentsRoutingModule {}
