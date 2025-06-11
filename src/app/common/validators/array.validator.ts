import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

// Array Validators
export class ArrayValidators {
  // max length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static maxLength(max: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length > max ? { maxLength: true } : null;
    };
  }

  // min length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static minLength(min: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length < min ? { minLength: true } : null;
    };
  }

  // between length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static betweenLength(min: number, max: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length < min || control.length > max ? { betweenLength: true } : null;
    };
  }
}
