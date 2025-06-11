import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentTypeBD, FieldDocumentBD } from '@speed/common/interfaces/document-type.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DocumentTypeService {
  public constructor(private http: HttpClient) {}

  public getTipoDocumentos(params: any) {
    return firstValueFrom(this.http.post<Array<DocumentTypeBD>>(`${environment.apiUrl}/tipoDocumento/list`, params));
  }

  public getCampos() {
    return firstValueFrom(this.http.get<Array<FieldDocumentBD>>(`${environment.apiUrl}/tipoDocumento/campos`));
  }

  public getCamposDisponibles(id:number) {
    return firstValueFrom(this.http.get<Array<FieldDocumentBD>>(`${environment.apiUrl}/tipoDocumento/camposDisponibles/${id}`));
  }

  public getTipoDocumentoById(id:number) {
    return firstValueFrom(this.http.get<DocumentTypeBD>(`${environment.apiUrl}/tipoDocumento/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerTipoDocumento(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/tipoDocumento/save`, params);
  }
}
