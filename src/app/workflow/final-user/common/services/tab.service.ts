import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Opciones } from 'src/app/authentication/interfaces';


@Injectable({ providedIn: 'root'  })
export class TabService{
  private tab = new BehaviorSubject<Opciones>({id:0,nombre:'',linkOpcion:'',subOpciones:[]});
  actualizar(tab : Opciones){
    this.tab.next(tab);
  }
  obtener(){
    return this.tab.asObservable();
  }
}
