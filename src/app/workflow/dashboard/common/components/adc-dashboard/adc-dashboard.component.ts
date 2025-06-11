import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import { IModeloDocumento, IProcesoFirmaADC, IProcesoVisadoADC } from '../../interfaces';

@Component({
  selector: 'ui-adc-dashboard',
  templateUrl: 'adc-dashboard.component.html',
  styleUrls: ['./adc-dashboard.component.scss'],
})
export class AdcDashboardComponent implements OnInit {
  @Input() public dataDashboard?: IDashboardResponse;
  @Input() public grupos: Array<string> = [];
  @Input() public procesoFirma: Array<IProcesoFirmaADC> = [];
  @Input() public procesoVisado: Array<IProcesoVisadoADC> = [];
  @Input() public modeloDocumentos!: Array<IModeloDocumento>;
  @Input() public urlLegalAlDia?: IParameter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public documentos: any = {};
  @Output() public downloadFile: EventEmitter<string> = new EventEmitter();
  public barGraph!: EChartsOption;
  // TODO: Habilitar si lo solicitan
  // public pieGraph!: EChartsOption;
  public isLoading = true;
  private colors = ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8'];

  public ngOnInit(): void {
    this.barGraph = {
      title: {
        text: 'Estado de Solicitudes por Grupo',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: this.grupos,
        top: 'bottom',
      },
      toolbox: {},
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.grupos,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: this.getSeries(),
    };

    // TODO: descomentar para la grafica circular
    // this.pieGraph = {
    //   title: [
    //     {
    //       text: 'Estado de Solicitudes General',
    //       left: 'center',
    //     },
    //     {
    //       subtext: this.grupos[0],
    //       left: '25%',
    //       top: '45%',
    //       textAlign: 'center',
    //     },
    //     {
    //       subtext: this.grupos[1],
    //       left: '75%',
    //       top: '45%',
    //       textAlign: 'center',
    //     },
    //     {
    //       subtext: this.grupos[2],
    //       left: '25%',
    //       top: '93%',
    //       textAlign: 'center',
    //     },
    //     {
    //       subtext: this.grupos[3],
    //       left: '75%',
    //       top: '93%',
    //       textAlign: 'center',
    //     },
    //   ],
    //   dataset: {
    //     source: this.getSource(),
    //   },
    //   series: [
    //     {
    //       type: 'pie',
    //       radius: '30%',
    //       center: ['25%', '30%'],
    //       color: ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8'],
    //       encode: {
    //         itemName: 'product',
    //         value: this.grupos[0],
    //       },
    //     },
    //     {
    //       type: 'pie',
    //       radius: '30%',
    //       center: ['75%', '30%'],
    //       color: ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8'],
    //       encode: {
    //         itemName: 'product',
    //         value: this.grupos[1],
    //       },
    //     },
    //     {
    //       type: 'pie',
    //       radius: '30%',
    //       center: ['25%', '75%'],
    //       color: ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8'],
    //       encode: {
    //         itemName: 'product',
    //         value: this.grupos[2],
    //       },
    //     },
    //     {
    //       type: 'pie',
    //       radius: '30%',
    //       center: ['75%', '75%'],
    //       color: ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8'],
    //       encode: {
    //         itemName: 'product',
    //         value: this.grupos[3],
    //       },
    //     },
    //   ],
    // };

    this.isLoading = false;
  }

  public getIniciales(name: string): string {
    const nombres = name.split(' ');
    return `${nombres[0][0]}${nombres[2][0]}`;
  }

  public downloadDocument(ruta: string) {
    this.downloadFile.emit(ruta);
  }

  private getSeries(): SeriesOption[] {
    const series: SeriesOption[] = [];
    let i = 0;
    for (const item in this.documentos) {
      series.push({
        name: item,
        type: 'bar',
        color: [this.colors[i]],
        barGap: 0,
        label: { show: false },
        emphasis: {
          focus: 'series',
        },
        data: this.documentos[item],
      });
      i++;
    }

    return series;
  }

  // TODO: descomentar para la grafica circular
  /*private getSource() {
    const source = [];
    source.push(['product', this.grupos[0], this.grupos[1], this.grupos[2], this.grupos[3]]);
    for (const item in this.documentos) {
      source.push([item, ...this.documentos[item]]);
    }
    return source;
  }*/
}
