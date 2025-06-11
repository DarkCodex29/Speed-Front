import { FormGroup, Validators } from '@angular/forms';
import { Utils } from './utils';

export function addValidatorsClienteJuridico(form: FormGroup) {
  Utils.addValidators(form, 'razonSocial', Validators.required);
}

export function addValidatorsClienteNatural(form: FormGroup) {
  Utils.addValidators(form, 'nombre', Validators.required);
  Utils.addValidators(form, 'apellidoPaterno', Validators.required);
  Utils.addValidators(form, 'apellidoMaterno', Validators.required);
}

export function addValidatorsClienteMantenimiento(form: FormGroup) {
  Utils.addValidators(form, 'nombre', Validators.required);
}
export function removeValidatorsClienteMantenimiento(form: FormGroup) {
  Utils.clearValidators(form, 'nombre');
}
export function removeValidatorsClienteNatural(form: FormGroup) {
  Utils.clearValidators(form, 'nombre');
  Utils.clearValidators(form, 'apellidoPaterno');
  Utils.clearValidators(form, 'apellidoMaterno');
}

export function removeValidatorsClienteJuridico(form: FormGroup) {
  Utils.clearValidators(form, 'razonSocial');
}
