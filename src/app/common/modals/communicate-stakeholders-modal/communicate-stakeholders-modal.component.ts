import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInterested } from '@speed/common/interfaces/output';
import { CommunicateStakeholdersModalPresenter } from './communicate-stakeholders-modal.presenter';
import { ICommunicateStakeholdersForm } from '@speed/common/interfaces/forms';
import { CommunicateInterestedService } from '@speed/common/services';

@Component({
  selector: 'ui-communicate-stakeholders-modal',
  templateUrl: 'communicate-stakeholders-modal.component.html',
  styleUrls: ['./communicate-stakeholders-modal.component.scss'],
  providers: [CommunicateStakeholdersModalPresenter, CommunicateInterestedService],
})
export class CommunicateStakeholdersComponent implements OnInit {
  @Input() public listUsers: Array<IInterested> = [];
  @Input() public idExpediente?: number;
  @Output() public clickedClose: EventEmitter<void>;
  @Output() public searchUser: EventEmitter<string>;
  @Output() public save: EventEmitter<ICommunicateStakeholdersForm>;
  public listUsersSelected: Array<IInterested> = [];

  public constructor(
    public presenter: CommunicateStakeholdersModalPresenter,
    private commmunicateInterestedService: CommunicateInterestedService,
  ) {
    this.clickedClose = new EventEmitter();
    this.searchUser = new EventEmitter();
    this.save = new EventEmitter();
  }

  public async ngOnInit() {
    this.presenter.patchValue({ idExpediente: this.idExpediente }, { emitEvent: false });
    this.getInterested();
  }

  public close() {
    this.clickedClose.emit();
  }

  public async buscarInteresado(event: Event) {
    const termino = (event as CustomEvent).detail;
    if (termino.length > 2) {
      this.searchUser.emit(termino);
    }
  }

  public seleccionarUsuario(event: Event) {
    const value = (event as CustomEvent<IInterested>).detail;
    const index = this.listUsersSelected.findIndex((x) => String(x.id) == String(value.id));
    if (index == -1) {
      if (value.nombre.substring(0, 5) === 'Grupo') {
        this.listUsersSelected.push({ ...value, esGrupo: 1 });
      } else {
        this.listUsersSelected.push({ ...value, esGrupo: 0 });
      }
      const idInteresados = this.listUsersSelected.map((item) => item.id);
      const esGrupo = this.listUsersSelected.map((item) => item.esGrupo);
      this.presenter.patchValue(
        {
          userFilter: null,
          idInteresados,
          esGrupo,
        },
        { emitEvent: false },
      );
    }
  }

  public deleteUser(index: number) {
    this.listUsersSelected.splice(index, 1);
    const idInteresados = this.listUsersSelected.map((item) => item.id);
    const esGrupo = this.listUsersSelected.map((item) => item.esGrupo);
    this.presenter.patchValue({ idInteresados, esGrupo }, { emitEvent: false });
  }

  public notify(formValues: ICommunicateStakeholdersForm) {
    this.save.emit(formValues);
  }

  private async getInterested() {
    const response = await this.commmunicateInterestedService.getInteresadosModal(this.idExpediente!);
    response.forEach((element) => {
      if (element.nombre.substring(0, 5) === 'Grupo') {
        this.listUsersSelected.push({ ...element, esGrupo: 1 });
      } else {
        this.listUsersSelected.push({ ...element, esGrupo: 0 });
      }
      const idInteresados = this.listUsersSelected.map((item) => item.id);
      const esGrupo = this.listUsersSelected.map((item) => item.esGrupo);
      this.presenter.patchValue(
        {
          userFilter: null,
          idInteresados,
          esGrupo,
        },
        { emitEvent: false },
      );
    });
  }
}
