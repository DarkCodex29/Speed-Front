import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDocumentUpload, ITabDocuments } from '../interfaces';
import { ArrayValidators } from '../validators';

export class DocumentFileModel {
  public name: FormControl;
  public files: FormArray<FormControl>;

  public constructor(data: IDocumentUpload) {
    this.name = new FormControl(data.name);
    this.files = new FormArray<FormControl>([]);

    if (data.required) {
      this.files.setValidators(ArrayValidators.minLength(1));
      this.files.updateValueAndValidity();
    }
  }
}

export class DocumentsTabModel {
  public id: FormControl;
  public idExpediente: FormControl;
  public idTipoDocumento: FormControl;
  public titulo: FormControl;
  public documentos: FormArray<FormGroup<DocumentFileModel>>;

  public constructor(dataTab: ITabDocuments) {
    this.id = new FormControl();
    this.idExpediente = new FormControl();
    this.idTipoDocumento = new FormControl(dataTab.code, Validators.required);
    this.titulo = new FormControl(dataTab.documentType, Validators.required);
    this.documentos = new FormArray<FormGroup<DocumentFileModel>>([], Validators.required);

    this.initFormDocuments(dataTab);
  }

  private initFormDocuments(dataTab: ITabDocuments) {
    if (dataTab.requiredFiles.length > 0) {
      dataTab.requiredFiles.forEach((requiredFile) => {
        const fileModel = new DocumentFileModel(requiredFile);
        this.documentos.push(new FormGroup(fileModel));
      });
    }
  }
}
