import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VirtualAssistantMaintenanceService } from 'src/app/workflow/maintenance/common/services';
import { IPregunta } from '@speed/common/interfaces';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  standalone: true,
  styleUrls: ['./list-questions.component.scss'],
  imports: [NgIf, NgFor, NgClass],
  providers: [VirtualAssistantMaintenanceService],
})
export class ListQuestionsComponent {
  public constructor(private virtualService: VirtualAssistantMaintenanceService) {}
  @Input() public questions: Array<IPregunta> = [];
  public registrarUsabilidad(codPregunta: string) {
    this.virtualService.registrarUsabilidad({ idOpcionAsistente: +codPregunta.substring(1), esOpcionAsistente: 'S' });
  }
}
