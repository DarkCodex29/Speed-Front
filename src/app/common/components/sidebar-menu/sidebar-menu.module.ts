import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { RouterModule } from '@angular/router';
import { MenuGroupComponent } from './components';

@NgModule({
  declarations: [SidebarMenuComponent, MenuGroupComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarMenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarMenuModule {}
