import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export class ObjectValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static validarObjeto(): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormControl)) return;
      return typeof control.value !== 'object' ? { error: 'No es un valor permitido' } : null;
    };
  }
}
