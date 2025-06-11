import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainer } from './dashboard.container';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import bar charts, all with Chart suffix
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts/theme/macarons.js';
import {
  AdcDashboardModule,
  AreaDashboardModule,
  LawyerDashboardModule,
  PracticingDashboardModule,
  TreeModule,
  StatusElaboradoModalModule,
  DetailElaboradoModalModule,
  ManagerDashboardModule,
} from './common/components';

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, PieChart, CanvasRenderer]);

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({ echarts }),
    AdcDashboardModule,
    LawyerDashboardModule,
    PracticingDashboardModule,
    AreaDashboardModule,
    TreeModule,
    StatusElaboradoModalModule,
    DetailElaboradoModalModule,
    ManagerDashboardModule,
  ],
  declarations: [DashboardContainer, DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[DashboardContainer, DashboardComponent]
})
export class DashboardModule {}
