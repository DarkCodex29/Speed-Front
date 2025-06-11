import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RequestTrackingComponent } from './request-tracking.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestTrackingRoutingModule } from './request-tracking-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestTrackingRoutingModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [RequestTrackingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RequestTrackingModule {}
