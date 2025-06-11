import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseFile } from '@speed/common/interfaces';
import { IResponseModel } from '@speed/common/interfaces/output';
import { environment } from '@speed/env/environment';

@Injectable()
export class SignedFileService {
  public constructor(private http: HttpClient) {}

  public uploadFile(formData: FormData) {
    return this.http.post<IResponseFile>(`${environment.apiUrl}/adjuntarFirmado/uploadFiles`, formData);
  }

  public saveSigned(params: any) {
    return this.http.post<IResponseModel>(`${environment.apiUrl}/adjuntarFirmado/guardarFirmado`, params);
  }
}
