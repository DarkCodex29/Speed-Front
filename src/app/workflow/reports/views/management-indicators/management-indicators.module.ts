import { NgModule } from '@angular/core';
import { ManagementIndicatorsComponent } from './management-indicators.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagementIndicatorsRoutingModule } from './management-indicators-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ManagementIndicatorsRoutingModule],
  declarations: [ManagementIndicatorsComponent],
})
export class ManagementIndicatorsModule {}
