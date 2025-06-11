import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import moment from 'moment';

export class Utils {
  public static formatDate(date: Date, format: string) {
    const dateFormated = moment(date).format(format);
    return dateFormated;
  }

  public static validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        for (const control1 of control.controls) {
          if (control1 instanceof FormControl) {
            control1.markAsTouched({
              onlySelf: true,
            });
          }
          if (control1 instanceof FormGroup) {
            this.validateAllFields(control1);
          }
        }
        control.markAsTouched({
          onlySelf: true,
        });
      }
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true,
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  public static removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key)?.clearValidators();
      form.get(key)?.updateValueAndValidity();
    }
  }

  public static clearValidators(form: FormGroup, control: string) {
    form.get(control)?.clearValidators();
    form.get(control)?.updateValueAndValidity();
  }

  public static addValidators(form: FormGroup, control: string, validators: ValidatorFn | ValidatorFn[] | null) {
    form.get(control)?.setValidators(validators);
    form.get(control)?.updateValueAndValidity();
  }

  public static isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
