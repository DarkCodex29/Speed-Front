import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VirtualAssistantMaintenanceService } from 'src/app/workflow/maintenance/common/services';
import { StatusVirtualAssistant } from '@speed/common/enums';
import { IAreaPregunta, IParametro, IPregunta } from '@speed/common/interfaces';

@Component({
  selector: 'app-virtual-assistant',
  templateUrl: './virtual-assistant.component.html',
  styleUrls: ['./virtual-assistant.component.scss'],
  providers: [VirtualAssistantMaintenanceService],
})
export class VirtualAssistantComponent implements OnInit {
  @ViewChild('panel', { static: false }) public panel!: ElementRef;
  @ViewChild('wizardLauncher', { static: false }) public wizardLauncher!: ElementRef;
  @ViewChild('panel2', { static: false }) public panel2!: ElementRef;
  @ViewChild('panelEstado', { static: false }) public panelEstado!: ElementRef;
  @ViewChild('panelTema', { static: false }) public panelTema!: ElementRef;
  @ViewChild('panelEnviarPregunta', { static: false }) public panelEnviarPregunta!: ElementRef;
  @ViewChild('panel3', { static: false }) public panel3!: ElementRef;
  @ViewChild('wizardStepHeader', { static: false }) public wizardStepHeader!: ElementRef;
  public statusAssistant: StatusVirtualAssistant = StatusVirtualAssistant.INIT;
  public readonly status = StatusVirtualAssistant;
  public titleWizardStepHeader = '';
  public isActivePanel = false;
  public isActivePanel2 = false;
  public isActivePanelEstado = false;
  public isActivePanelTema = false;
  public isActivePanelEnviarPregunta = false;
  public isActivePanel3 = false;
  public areaSelected = 0;
  public title = '';
  public temas: Array<IAreaPregunta> = [];
  public secciones: Array<IParametro> = [];
  public preguntas: Array<IPregunta> = [];
  public preguntasFiltradas: Array<IPregunta> = [];

  public constructor(private virtualAssistanceService: VirtualAssistantMaintenanceService) {}

  public async ngOnInit() {
    this.preguntas = await this.virtualAssistanceService.getListaPreguntas();
    this.preguntas.forEach((value) => {
      if (this.secciones.find((p) => p.id == value.grupo?.area?.id) == undefined) {
        this.secciones.push({ id: value.grupo?.area?.id, descripcion: value.grupo?.area?.descripcion });
      }
    });
  }

  public registrarUsabilidad(opcionAsistente: number, esOpcionAsistente: string) {
    this.virtualAssistanceService.registrarUsabilidad({ idOpcionAsistente: opcionAsistente, esOpcionAsistente: esOpcionAsistente });
  }

  public clickInit() {
    if (this.statusAssistant === this.status.INIT) {
      this.statusAssistant = this.status.PRESENTATION;
    } else {
      this.statusAssistant = this.status.INIT;
    }
  }

  public retroceder() {
    switch (this.statusAssistant) {
      case this.status.PRESENTATION:
        this.statusAssistant = this.status.INIT;
        break;
      case this.status.SELECT_AREA:
        this.statusAssistant = this.status.PRESENTATION;
        break;
      case this.status.SELECT_THEME:
        this.statusAssistant = this.status.SELECT_AREA;
        break;
      case this.status.SELECT_QUESTION:
        this.statusAssistant = this.status.SELECT_THEME;
        break;
      case this.status.SELECT_SEND_QUESTION:
        this.statusAssistant = this.status.SELECT_AREA;
        break;
      case this.status.SELECT_STATUS_DOCUMENT:
        this.statusAssistant = this.status.SELECT_AREA;
        break;
    }
  }

  public clickButtonInto() {
    this.title = 'Seleciona una área, luego ubica un tema';
    this.statusAssistant = this.status.SELECT_AREA;
  }

  public async clickSectionTema(codArea: number) {
    this.temas = await this.virtualAssistanceService.getTemasByArea({ codArea: codArea });
    this.areaSelected = codArea;
    this.statusAssistant = this.status.SELECT_THEME;
  }

  public async clickSection(codeArea: number, codeTema: number) {
    this.preguntasFiltradas = [];
    this.preguntasFiltradas = this.preguntas.filter((item) => item.grupo?.area?.id == codeArea && item.grupo?.tema?.id == codeTema);
    if (this.preguntasFiltradas.length > 0) {
      this.titleWizardStepHeader = this.preguntasFiltradas[0].grupo?.tema?.descripcion as string;
    } else {
      this.titleWizardStepHeader = 'Sin registros';
    }
    this.statusAssistant = this.status.SELECT_QUESTION;
  }

  public async clickOtherOptions(status: StatusVirtualAssistant) {
    this.statusAssistant = status;
  }
}
