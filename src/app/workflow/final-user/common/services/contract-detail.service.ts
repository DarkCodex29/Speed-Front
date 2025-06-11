import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttachDocumentModal, IHistorialOutput } from '@speed/common/interfaces';
import { IAttachDocumentModalModel } from '@speed/common/interfaces/forms';
import { IResponseModel } from '@speed/common/interfaces/output';
import { environment } from '@speed/env/environment';

@Injectable()
export class ContractDetailService {
  public constructor(private http: HttpClient) {}

  public getViewHistory(idExpedient: number) {
    return this.http.get<IHistorialOutput>(`${environment.apiUrl}/verTraza?idExpediente=${idExpedient}`);
  }

  public dataConfigAttachDocument() {
    return this.http.get<IAttachDocumentModal>(`${environment.apiUrl}/adjuntarDocumento/adjuntarDocumentoExpediente`);
  }

  public saveNewDocument(body: IAttachDocumentModalModel) {
    return this.http.post<IResponseModel>(`${environment.apiUrl}/adjuntarDocumento/guardarNuevoDocumento`, body);
  }
}
