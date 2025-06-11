import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAreaPregunta } from '@speed/common/interfaces';
import { IPurchaseTransaction } from '@speed/common/interfaces/forms';
import { IResponseModel } from '@speed/common/interfaces/output';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PurchaseTransactionService {
  public constructor(private http: HttpClient) {}

  public filtrarByParams(descripcion: string = '') {
    return firstValueFrom(
      this.http.get<Array<IPurchaseTransaction>>(`${environment.apiUrl}/compraTransaccion/buscar?descripcion=${descripcion}`),
    );
  }

  public guardar(params: IPurchaseTransaction) {
    return this.http.post<IResponseModel>(`${environment.apiUrl}/compraTransaccion/guardar`, params);
  }

  public eliminar(idModel: number) {
    return this.http.delete<IResponseModel>(`${environment.apiUrl}/compraTransaccion/${idModel}`);
  }
}
