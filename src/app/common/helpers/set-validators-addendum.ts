import { FormGroup, Validators } from '@angular/forms';
import { ArrayValidators } from '../validators';
import { Utils } from './utils';

export function setValidatorsRegisterManualAdendum(form: FormGroup) {
  Utils.addValidators(form, 'adenda.fechaInicio', Validators.required);
  Utils.addValidators(form, 'adenda.propositoObservaciones', Validators.required);
  Utils.addValidators(form, 'adenda.ubicaciones', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'adenda.representantesLegales', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'adenda.idContrato', Validators.required);
  Utils.addValidators(form, 'adenda.idContraparte', Validators.required);
  // Utils.addValidators(form, 'adenda.domicilioContraparte', Validators.required);
  // Utils.addValidators(form, 'adenda.nombreContraparte', Validators.required);
  // Utils.addValidators(form, 'adenda.telefonoContraparte', Validators.required);
  // Utils.addValidators(form, 'adenda.emailContraparte', Validators.required);
}

export function removeValidatorsAddendum(form: FormGroup) {
  Utils.clearValidators(form, 'process.adenda.fechaInicio');
  Utils.clearValidators(form, 'process.adenda.propositoObservaciones');
  Utils.clearValidators(form, 'process.adenda.ubicaciones');
  Utils.clearValidators(form, 'process.adenda.representantesLegales');
  Utils.clearValidators(form, 'process.adenda.idContrato');
  Utils.clearValidators(form, 'process.adenda.idContraparte');
  Utils.clearValidators(form, 'process.adenda.domicilioContraparte');
  Utils.clearValidators(form, 'process.adenda.nombreContraparte');
  Utils.clearValidators(form, 'process.adenda.telefonoContraparte');
  Utils.clearValidators(form, 'process.adenda.emailContraparte');
  Utils.clearValidators(form, 'process.adenda.tipoDocumento');
}

export function setValidatorsAddendumSaveProgress(form: FormGroup) {
  removeValidatorsAddendum(form);
  Utils.addValidators(form, 'process.adenda.idContrato', Validators.required);
}

export function setValidatorsAddendumSendRequest(form: FormGroup) {
  removeValidatorsAddendum(form);
  Utils.addValidators(form, 'process.adenda.fechaInicio', Validators.required);
  Utils.addValidators(form, 'process.adenda.propositoObservaciones', Validators.required);
  Utils.addValidators(form, 'process.adenda.ubicaciones', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'process.adenda.representantesLegales', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'process.adenda.idContrato', Validators.required);
  Utils.addValidators(form, 'process.adenda.idContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.domicilioContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.nombreContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.telefonoContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.emailContraparte', Validators.required);
}

export function setValidatorsAutomaticAddendumSaveProgress(form: FormGroup) {
  removeValidatorsAddendum(form);
  Utils.addValidators(form, 'process.adenda.idContrato', Validators.required);
  Utils.addValidators(form, 'process.adenda.tipoDocumento', Validators.required);
}

export function setValidatorsAutomaticAddendumSendRequest(form: FormGroup) {
  removeValidatorsAddendum(form);
  Utils.addValidators(form, 'process.adenda.fechaInicio', Validators.required);
  Utils.addValidators(form, 'process.adenda.propositoObservaciones', Validators.required);
  Utils.addValidators(form, 'process.adenda.ubicaciones', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'process.adenda.representantesLegales', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'process.adenda.tipoDocumento', Validators.required);
  Utils.addValidators(form, 'process.adenda.idContrato', Validators.required);
  Utils.addValidators(form, 'process.adenda.idContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.domicilioContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.nombreContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.telefonoContraparte', Validators.required);
  // Utils.addValidators(form, 'process.adenda.emailContraparte', Validators.required);
}
