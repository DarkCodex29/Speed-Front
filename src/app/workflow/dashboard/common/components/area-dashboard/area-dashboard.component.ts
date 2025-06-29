import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import {
  IDocumentGraph,
  IModeloDocumento,
  ISolicitudesAbogados,
  ISolicitudesArea,
  ISolicitudesGenerales,
  ISolicitudesGeneralesElaborado,
  ISolicitudesVigentes,
} from '../../interfaces';

@Component({
  selector: 'ui-area-dashboard',
  templateUrl: 'area-dashboard.component.html',
  styleUrls: ['./area-dashboard.component.scss'],
})
export class AreaDashboardComponent implements OnInit {
  @Input() public dataDashboard?: IDashboardResponse;
  @Input() public dataSolicitudesGenerales: Array<ISolicitudesGenerales> = [];
  @Input() public dataSolicitudesGeneralesElaborado: Array<ISolicitudesGeneralesElaborado> = [];
  @Input() public urlLegalAlDia?: IParameter;
  @Input() public dataSolicitudesAbogado: Array<ISolicitudesAbogados> = [];
  @Input() public dataSolicitudesVigente: Array<ISolicitudesVigentes> = [];
  @Input() public dataSolicitudes: Array<ISolicitudesArea> = [];
  @Input() public modeloDocumentos!: Array<IModeloDocumento>;
  @Output() public downloadFile: EventEmitter<string> = new EventEmitter();
  public isLoading = true;
  public barGraph!: EChartsOption;
  public pieGraph!: EChartsOption;
  public isModalOpenElaborado = false;
  public isModalOpenElaboradoDetail = false;
  public porcentajeElaborado = 0;
  public valSelectDetailModal = 0;
  private colors = ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8', '#bf9000', '#b8aeae'];

  public ngOnInit(): void {
    this.setPie();
    // TODO: descomentar para mostrar el grafico de barras
    // this.setBar();
    this.isLoading = false;
  }

  public getIniciales(name: string): string {
    const nombres = name.split(',');
    return `${nombres[0][0]}${nombres[1][1]}`;
  }

  public setPie() {
    //const estados = this.dataSolicitudesGenerales.map((item) => item.estado);
    let cantidadAdendas = 0;
    let cantidadContratos = 0;
    let cantidadDocElaborado = 0;
    let catidadEnVisado = 0;
    let cantidadVisado = 0;
    let cantidadEnviadoFirma = 0;
    this.dataSolicitudesGenerales.forEach((item) => {
      if (item.proceso == 'Adenda') {
        cantidadAdendas = cantidadAdendas + item.cantidad;
      }
      if (item.proceso == 'Contrato') {
        cantidadContratos = cantidadContratos + item.cantidad;
      }
      if (item.estado == 'Doc. Elaborado') {
        cantidadDocElaborado = cantidadDocElaborado + item.cantidad;
      }
      if (item.estado == 'En Visado') {
        catidadEnVisado = catidadEnVisado + item.cantidad;
      }
      if (item.estado == 'Visado') {
        cantidadVisado = cantidadVisado + item.cantidad;
      }
      if (item.estado == 'Enviado a Firma') {
        cantidadEnviadoFirma = cantidadEnviadoFirma + item.cantidad;
      }
    });
    this.pieGraph = {
      title: {
        text: 'Estado General de Solicitudes por Área',
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
          top: '8%',
          label: {
            position: 'inner',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: cantidadContratos, name: 'Contrato', selected: true },
            { value: cantidadAdendas, name: 'Adenda' },
            // { value: 2, name: 'Adenda Automática' }
          ],
        },
        {
          name: 'Estado Solicitud',
          type: 'pie',
          color: ['#bf9000', '#b8aeae', '#e5e1e1', '#cdb0e8'],
          radius: ['45%', '60%'],
          top: '8%',
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
                fontSize: 14,
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
          data: [
            { value: cantidadDocElaborado, name: 'Doc. Elaborado' },
            { value: catidadEnVisado, name: 'En Visado' },
            { value: cantidadVisado, name: 'Visado' },
            { value: cantidadEnviadoFirma, name: 'Enviado a Firma' },
          ],
        },
      ],
    };
  }

  public setBar() {
    let abogados: Array<string> = [];
    const documentos: IDocumentGraph = {};
    this.dataSolicitudesAbogado.forEach((item) => {
      if (!abogados.includes(item.abogado)) {
        abogados.push(item.abogado);
      }
    });
    this.dataSolicitudesAbogado.forEach((item) => {
      if (item.estado in documentos) {
        const index = abogados.indexOf(item.abogado);
        documentos[item.estado].cantidad[index] = item.cantidad;
      } else {
        documentos[item.estado] = {
          cantidad: new Array(abogados.length).fill(0),
          color: '',
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
        data: abogados,
        top: 'bottom',
      },
      toolbox: {},
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: abogados,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: this.getSeries(documentos),
    };
  }

  public downloadDocument(ruta: string) {
    this.downloadFile.emit(ruta);
  }

  public onChartClick(event: any): void {
    if (event.data && event.data.name === 'Doc. Elaborado') {
      this.porcentajeElaborado = parseFloat(event.percent.toFixed(2));
      this.isModalOpenElaborado = true;
    }
  }

  public closeModalF(): void {
    this.isModalOpenElaborado = false;
  }

  public viewDetails(val: number): void {
    this.valSelectDetailModal = val;
    this.isModalOpenElaborado = false;
    this.isModalOpenElaboradoDetail = true;
  }

  public closeModalD(): void {
    this.isModalOpenElaboradoDetail = false;
    this.isModalOpenElaborado = true;
  }

  private getSeries(documentos: IDocumentGraph): SeriesOption[] {
    const series: SeriesOption[] = [];
    let i = 0;
    for (const document in documentos) {
      series.push({
        name: document,
        type: 'bar',
        color: [this.colors[i]],
        label: { show: false },
        emphasis: {
          focus: 'series',
        },
        data: documentos[document].cantidad,
      });
      i++;
    }

    return series;
  }
}
