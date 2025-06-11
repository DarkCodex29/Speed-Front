import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class WorkflowTabCacheService {
    // Un HashMap para almacenar el caché. La clave es la página y el valor son los datos. 
    private cache = new Map<string, any>();
    // BehaviorSubject que contendrá los datos del caché actualizados. 
    public cache$ = new BehaviorSubject<any | null>(null);

    // El método 'set' para almacenar datos en el caché. 
    set(key: string, data: any): void {
        // Verificamos si ya existen datos para esta clave. 
        if (this.cache.has(key)) {
            // Si ya existe, eliminamos para sobreescribir sobrescribir los datos. 
            this.cache.delete(key);
        }
        // Si no hay datos para esta clave, los almacenamos en el caché y actualizamos el BehaviorSubject. 
        this.cache.set(key, data);
        const dataC = this.cache.get(key);
        if (dataC) {
            this.cache$.next(dataC);
        }
    }

    // El método 'get' para recuperar datos del caché. 
    get(key: string): any {
        // Recuperamos los datos del caché y actualizamos el BehaviorSubject. 
        const data = this.cache.get(key);
        if (data) {
            this.cache$.next(data);
        }
        return data;
    }

    // El método 'clear' para borrar datos del caché. 
    clear(key: string): void {
        // Eliminamos los datos del caché y actualizamos el BehaviorSubject. 
        this.cache.delete(key);
        this.cache$.next(null);
    }
    // El método 'clearAll' para borrar todos datos del caché. 
    clearAll(): void {
        // Eliminamos los datos del caché y actualizamos el BehaviorSubject. 
        this.cache.clear();
        this.cache$.next(null);
    }

}