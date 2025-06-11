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
  selector: 'ui-lawyer-dashboard',
  templateUrl: 'lawyer-dashboard.component.html',
  styleUrls: ['lawyer-dashboard.component.scss'],
})
export class LawyerDashboardComponent implements OnInit {
  @Input() public dataDashboard?: IDashboardResponse;
  @Input() public dataSolicitudesGenerales: Array<ISolicitudesGenerales> = [];
  @Input() public urlLegalAlDia?: IParameter;
  @Input() public dataSolicitudesAbogadoResponsable: Array<ISolicitudesAbogadosResponsables> = [];
  @Input() public dataClientesInternos: Array<IClientesInternos> = [];
  @Input() public modeloDocumentos!: Array<IModeloDocumento>;
  @Input() public dataSolicitudesGeneralesElaborado: Array<ISolicitudesGeneralesElaborado> = [];
  @Output() public downloadFile: EventEmitter<string> = new EventEmitter();
  public isLoading = true;
  public barGraph!: EChartsOption;
  public circleGraph!: EChartsOption;
  public isModalOpenElaborado = false;
  public porcentajeElaborado = 0.0;
  public isModalOpenElaboradoDetail = false;
  public valSelectDetailModal = 0;

  public ngOnInit(): void {
    // TODO: Descomentar si se necesita el anterior grafico de barras
    // this.barGraph = {
    //   title: {
    //     text: 'Estado de Solicitudes por Abogado Responsable',
    //     left: 'center',
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'shadow',
    //     },
    //   },
    //   legend: {
    //     data: ['Alexia Torres', 'Paula Rodriguez'],
    //     top: 'bottom',
    //   },
    //   toolbox: {},
    //   xAxis: [
    //     {
    //       type: 'category',
    //       axisTick: { show: false },
    //       data: ['Alexia Torres', 'Paula Rodriguez'],
    //     },
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value',
    //     },
    //   ],
    //   series: [
    //     {
    //       name: 'Doc. Elaborado',
    //       type: 'bar',
    //       color: ['#bf9000'],
    //       barGap: 0,
    //       label: GRAPH_LABEL_OPTION,
    //       emphasis: {
    //         focus: 'series',
    //       },
    //       data: [13, 27],
    //     },
    //     {
    //       name: 'En Visado',
    //       type: 'bar',
    //       color: ['#b8aeae'],
    //       label: GRAPH_LABEL_OPTION,
    //       emphasis: {
    //         focus: 'series',
    //       },
    //       data: [0, 6],
    //     },
    //     {
    //       name: 'Visado',
    //       type: 'bar',
    //       color: ['#e5e1e1'],
    //       label: GRAPH_LABEL_OPTION,
    //       emphasis: {
    //         focus: 'series',
    //       },
    //       data: [3, 9],
    //     },
    //     {
    //       name: 'Enviado a Firma',
    //       type: 'bar',
    //       color: ['#cdb0e8'],
    //       label: GRAPH_LABEL_OPTION,
    //       emphasis: {
    //         focus: 'series',
    //       },
    //       data: [2, 7],
    //     },
    //   ],
    // };

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
    let abogados: Array<string> = [];
    const documentos: IDocumentGraph = {};
    this.dataSolicitudesAbogadoResponsable.forEach((item) => {
      if (!abogados.includes(item.abogado)) {
        abogados.push(item.abogado);
      }
    });
    this.dataSolicitudesAbogadoResponsable.forEach((item) => {
      if (item.estado in documentos) {
        const index = abogados.indexOf(item.abogado);
        documentos[item.estado].cantidad[index] = item.cantidad;
      } else {
        documentos[item.estado] = {
          cantidad: new Array(abogados.length).fill(0),
          color: String(item.color),
        };
        const index = abogados.indexOf(item.abogado);
        documentos[item.estado].cantidad[index] = item.cantidad;
      }
    });
    abogados = abogados.map((item) => {
      const arrayName = item.split(',');
      return `${arrayName[0].split(' ')[0].trim()} ${item.split(',')[1].trim().split(' ')[0]}`;
    });

    this.barGraph = {
      title: {
        text: 'Estado de Solicitudes por Abogado Responsable',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        top: 'bottom',
      },
      xAxis: {
        type: 'category',
        data: abogados,
      },
      yAxis: {
        type: 'value',
      },
      series: this.getSeries(documentos),
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

  private getSeries(documentos: IDocumentGraph): SeriesOption[] {
    const series: SeriesOption[] = [];
    for (const document in documentos) {
      series.push({
        name: document,
        type: 'bar',
        color: documentos[document].color,
        stack: 'total',
        label: { show: false },
        emphasis: {
          focus: 'series',
        },
        data: documentos[document].cantidad,
      });
    }

    return series;
  }
}
