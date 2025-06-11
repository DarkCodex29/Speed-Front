import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlarmRecordModalPresenter } from './alarm-record-modal.presenter';
import { IHcAlarma, IInterested } from '@speed/common/interfaces/output';
import { EditorChangeContent, EditorChangeSelection, QuillViewComponent } from 'ngx-quill';
import { initTextEditor } from '@speed/common/helpers';
import { IAlarmModel } from '@speed/common/interfaces/forms';

@Component({
  selector: 'ui-alarm-record-modal',
  templateUrl: 'alarm-record-modal.component.html',
  styleUrls: ['alarm-record-modal.component.scss'],
  providers: [AlarmRecordModalPresenter],
})
export class AlarmRecordModalComponent implements AfterViewInit, OnInit {
  @Input() public listUsers: Array<IInterested> = [];
  @Input() public idDocumentoLegal?: number;
  @Input() public alarmEdit?: IAlarmModel;
  @Output() public clickedClose: EventEmitter<void>;
  @Output() public searchUser: EventEmitter<string>;
  @Output() public save: EventEmitter<IAlarmModel>;
  @ViewChild('editorText') public editorText!: QuillViewComponent;
  public action = 'Registrar';
  public listUsersSelected: Array<IInterested> = [];
  public modulesQuill = initTextEditor();

  public constructor(public alarmRecordPresenter: AlarmRecordModalPresenter) {
    this.clickedClose = new EventEmitter();
    this.searchUser = new EventEmitter();
    this.save = new EventEmitter();
  }

  public ngAfterViewInit() {
    this.editorText.content = this.alarmEdit?.mensaje;
  }

  public ngOnInit(): void {
    this.alarmRecordPresenter.patchValue({ idDocumentoLegal: this.idDocumentoLegal }, { emitEvent: false });
    if (this.alarmEdit) {
      this.action = 'Editar';
      this.alarmRecordPresenter.setValues(this.alarmEdit);
      if (this.alarmEdit.namesIdGrupo.length) {
        this.alarmEdit.namesIdGrupo.forEach(nameG => {
          this.seleccionarUsuario(null, nameG)
        });
      }
      if (this.alarmEdit.namesIdVisadores.length) {
        this.alarmEdit.namesIdVisadores.forEach(nameV => {
          this.seleccionarUsuario(null, nameV)
        });
      }
    } else {
      this.alarmRecordPresenter.disable('id');
    }
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

  public seleccionarUsuario(event: Event | null, valueE: { nombre: string, id: number } | null) {
    const value = (event as CustomEvent<IInterested>)?.detail ?? valueE;
    if (value.nombre.substring(0, 5) === 'Grupo') {
      this.listUsersSelected.push({ ...value, esGrupo: 1 });
    } else {
      this.listUsersSelected.push({ ...value, esGrupo: 0 });
    }
    const idVisadores = this.listUsersSelected.map((item) => item.id);
    const esGrupo = this.listUsersSelected.map((item) => item.esGrupo);
    this.alarmRecordPresenter.patchValue(
      {
        userFilter: null,
        idVisadores,
        esGrupo,
      },
      { emitEvent: false },
    );
  }

  public deleteUser(index: number) {
    this.listUsersSelected.splice(index, 1);
    const idVisadores = this.listUsersSelected.map((item) => item.id);
    const esGrupo = this.listUsersSelected.map((item) => item.esGrupo);
    this.alarmRecordPresenter.patchValue({ idVisadores, esGrupo }, { emitEvent: false });
  }

  public onChangeEditor(event: EditorChangeContent | EditorChangeSelection): void {
    const value = (event as EditorChangeContent).html;
    if (event.event=="text-change") {
      this.alarmRecordPresenter.patchValue({ mensaje: value });
    } 
  }

  public saveAlarm(formValues: IAlarmModel) {
    this.save.emit(formValues);
  }
}
