import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { ManagerDashboardContainer } from './manager-dashboard.container';
import { ManagerDashboardComponent } from './manager-dashboard.component';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TableModule } from 'primeng/table';
import { TreeModule } from '../tree/tree.module';
import { StatusElaboradoModalModule } from '../status-elaborado-modal/status-elaborado-modal.module';
import { DetailElaboradoModalModule } from '../detail-elaborado-modal/detail-elaborado-modal.module';
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, PieChart, CanvasRenderer]);

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    NgxEchartsModule.forRoot({ echarts }),
    TreeModule,
    StatusElaboradoModalModule,
    DetailElaboradoModalModule,
  ],
  declarations: [ManagerDashboardComponent, ManagerDashboardContainer],
  exports: [ManagerDashboardContainer],
})
export class ManagerDashboardModule {}
