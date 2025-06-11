import { NgModule } from '@angular/core';
import { AdcDashboardContainer } from './adc-dashboard.container';
import { AdcDashboardComponent } from './adc-dashboard.component';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TableModule } from 'primeng/table';
import { TreeModule } from '../tree/tree.module';
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, PieChart, CanvasRenderer]);

@NgModule({
  imports: [CommonModule, TableModule, NgxEchartsModule.forRoot({ echarts }), TreeModule],
  declarations: [AdcDashboardContainer, AdcDashboardComponent],
  exports: [AdcDashboardContainer],
})
export class AdcDashboardModule {}
