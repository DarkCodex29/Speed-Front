import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import {
  IClientesInternos,
  IDataGraph,
  IDocumentGraph,
  IModeloDocumento,
  ISolicitudesAbogadosResponsables,
  ISolicitudesGenerales,
  ISolicitudesGeneralesElaborado,
} from '../../interfaces';

@Component({
  selector: 'ui-manager-dashboard',
  templateUrl: 'manager-dashboard.component.html',
  styleUrls: ['manager-dashboard.component.scss'],
})
export class ManagerDashboardComponent implements OnInit {
  @Input() public grupos: Array<string> = [];
  @Input() public dataDashboard?: IDashboardResponse;
  @Input() public dataSolicitudesGenerales: Array<ISolicitudesGenerales> = [];
  @Input() public urlLegalAlDia?: IParameter;
  @Input() public dataSolicitudesAbogadoResponsable: Array<ISolicitudesAbogadosResponsables> = [];
  @Input() public dataClientesInternos: Array<IClientesInternos> = [];
  @Input() public modeloDocumentos!: Array<IModeloDocumento>;
  @Input() public dataSolicitudesGeneralesElaborado: Array<ISolicitudesGeneralesElaborado> = [];
  @Output() public downloadFile: EventEmitter<string> = new EventEmitter();
  @Input() public documentos: any = {};
  public isLoading = true;
  public barGraph!: EChartsOption;
  public circleGraph!: EChartsOption;
  public isModalOpenElaborado = false;
  public porcentajeElaborado = 0.0;
  public isModalOpenElaboradoDetail = false;
  public valSelectDetailModal = 0;
  private colors = ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8'];

  public ngOnInit(): void {
    this.setCircle();
    this.setBar();
    this.isLoading = false;
  }

  public setCircle() {
    const procesos: Array<{ value: number; name: string }> = [];
    const estados: Array<IDataGraph> = [];
    this.dataSolicitudesGenerales.forEach((item) => {
      const indexProceso = procesos.findIndex((elem) => elem.name === item.proceso);
      if (indexProceso === -1) {
        procesos.push({ value: item.cantidad, name: item.proceso });
      } else {
        procesos[indexProceso].value = procesos[indexProceso].value + item.cantidad;
      }
      const indexEstado = estados.findIndex((elem) => elem.name === item.estado);
      if (indexEstado === -1) {
        estados.push({ value: item.cantidad, name: item.estado, itemStyle: { color: String(item.color) } });
      } else {
        estados[indexEstado].value = estados[indexEstado].value + item.cantidad;
      }
    });

    this.circleGraph = {
      title: {
        text: 'Estado de Solicitudes General',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: { show: false },
      series: [
        {
          name: 'Tipo Solicitud',
          type: 'pie',
          color: ['#f1c232', '#b8aeae'],
          selectedMode: 'single',
          radius: [0, '30%'],
          top: '5%',
          label: {
            position: 'inner',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          data: [...procesos],
        },
        {
          name: 'Estado Solicitud',
          type: 'pie',
          radius: ['45%', '60%'],
          top: '5%',
          labelLine: {
            length: 30,
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#ffffff',
            borderColor: '#8C8D8E',
            borderWidth: 2,
            borderRadius: 10,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center',
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0,
              },
              b: {
                color: '#4C5058',
                fontWeight: 'bold',
                lineHeight: 33,
              },
              per: {
                color: '#fff',
                backgroundColor: '#edce70',
                padding: [3, 4],
                borderRadius: 4,
              },
            },
          },
          data: [...estados],
        },
      ],
    };
  }

  public setBar() {
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
  }

  public downloadDocument(ruta: string) {
    this.downloadFile.emit(ruta);
  }

  public closeModalF() {
    this.isModalOpenElaborado = false;
  }

  public openModal() {
    this.isModalOpenElaborado = true;
  }

  public onChartClick(event: any) {
    if (event.name === 'Doc. Elaborado') {
      this.porcentajeElaborado = event.percent;
      this.isModalOpenElaborado = true;
    }
  }

  public viewDetails(value: number) {
    this.valSelectDetailModal = value;
    this.isModalOpenElaboradoDetail = true;
    this.isModalOpenElaborado = false;
  }

  public closeModalD() {
    this.isModalOpenElaboradoDetail = false;
    this.isModalOpenElaborado = true;
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
}
