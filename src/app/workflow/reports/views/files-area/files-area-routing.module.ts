import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesAreaComponent } from './files-area.component';

const routes: Routes = [{ path: '', component: FilesAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesAreaRoutingModule {}
