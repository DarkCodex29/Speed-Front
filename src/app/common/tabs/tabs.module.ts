import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TabComponent } from './components/tab/tab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [DynamicTabsDirective, TabComponent, TabsComponent],
  exports: [TabComponent, TabsComponent,DynamicTabsDirective],
})
export class TabsModule {}
