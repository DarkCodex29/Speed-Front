import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessBD } from '@speed/common/interfaces/process.interface';
import { WorkflowBD } from '@speed/common/interfaces/workflow.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WorkflowService {
  public constructor(private http: HttpClient) {}

  public getWorkflows(params: any) {
    return firstValueFrom(this.http.post<Array<WorkflowBD>>(`${environment.apiUrl}/workflow/list`, params));
  }

  public getWorkflowById(id: number) {
    return firstValueFrom(this.http.get<WorkflowBD>(`${environment.apiUrl}/workflow/find/${id}`));
  }

  public getProcesos() {
    return firstValueFrom(this.http.get<Array<ProcessBD>>(`${environment.apiUrl}/workflow/procesos`));
  }

  public registerWorkflow(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/workflow/save`, params);
  }
}
