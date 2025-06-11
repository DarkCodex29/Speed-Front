import { FormArray, FormGroup, Validators } from '@angular/forms';
import { Utils } from './utils';
import { ArrayValidators, ObjectValidator } from '../validators';
import { getTabApplicationDocuments, getTabPowers } from './buid-tabs';
import { ProcessType } from '../enums';

export function removeValidatorsContract(form: FormGroup) {
  Utils.clearValidators(form, 'process.contrato.idContraparte');
  Utils.clearValidators(form, 'process.contrato.representantesLegales');
  Utils.clearValidators(form, 'process.contrato.ubicaciones');

  Utils.clearValidators(form, 'process.contrato.idPais');
  Utils.clearValidators(form, 'process.contrato.idCompania');
  Utils.clearValidators(form, 'process.contrato.idArea');

  Utils.clearValidators(form, 'process.contrato.propositoObservaciones');
  Utils.clearValidators(form, 'process.contrato.fechaInicio');
  Utils.clearValidators(form, 'process.contrato.fechaFin');
  Utils.clearValidators(form, 'process.contrato.idMoneda');
  Utils.clearValidators(form, 'process.contrato.esPrecioFijo');
  Utils.clearValidators(form, 'process.contrato.esPrecioUnitario');
}

export function setValidatorsSendContract(form: FormGroup) {
  removeValidatorsContract(form);
  Utils.addValidators(form, 'process.contrato.idContraparte', [Validators.required, ObjectValidator.validarObjeto()]);
  Utils.addValidators(form, 'process.contrato.representantesLegales', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'process.contrato.idPais', Validators.required);
  Utils.addValidators(form, 'process.contrato.idCompania', Validators.required);
  Utils.addValidators(form, 'process.contrato.idArea', Validators.required);
  Utils.addValidators(form, 'process.contrato.ubicaciones', ArrayValidators.minLength(1));
  Utils.addValidators(form, 'process.contrato.propositoObservaciones', Validators.required);
  Utils.addValidators(form, 'process.contrato.fechaInicio', Validators.required);
  Utils.addValidators(form, 'process.contrato.fechaFin', Validators.required);
  Utils.addValidators(form, 'process.contrato.idMoneda', Validators.required);
  Utils.addValidators(form, 'process.contrato.esPrecioFijo', Validators.required);
  Utils.addValidators(form, 'process.contrato.esPrecioUnitario', Validators.required);
}

export function setValidatorsSaveContract(form: FormGroup) {
  removeValidatorsContract(form);
  Utils.addValidators(form, 'process.contrato.idContraparte', [Validators.required, ObjectValidator.validarObjeto()]);
  Utils.addValidators(form, 'process.contrato.idPais', Validators.required);
  Utils.addValidators(form, 'process.contrato.idCompania', Validators.required);
  Utils.addValidators(form, 'process.contrato.idArea', Validators.required);
}

export function removeValidatorsToFilesContract(form: FormGroup) {
  const formTabAplicationDocuments = form.get('tabApplicationDocuments')?.get('documentos') as FormArray;
  const edocument = getTabApplicationDocuments(ProcessType.CONTRATO);
  for (let i = 0; i < edocument.requiredFiles.length; i++) {
    if (edocument.requiredFiles[i].required) {
      formTabAplicationDocuments.at(i).get('files')?.clearValidators();
      formTabAplicationDocuments.at(i).get('files')?.updateValueAndValidity();
    }
  }

  const formTabPowers = form.get('tabPowers')?.get('documentos') as FormArray;
  const tabPowers = getTabPowers();
  for (let i = 0; i < tabPowers.requiredFiles.length; i++) {
    if (tabPowers.requiredFiles[i].required) {
      formTabPowers.at(i).get('files')?.clearValidators();
      formTabPowers.at(i).get('files')?.updateValueAndValidity();
    }
  }
}

export function addValidatorsToFilesContract(form: FormGroup) {
  const formTabAplicationDocuments = form.get('tabApplicationDocuments')?.get('documentos') as FormArray;
  const edocument = getTabApplicationDocuments(ProcessType.CONTRATO);
  for (let i = 0; i < edocument.requiredFiles.length; i++) {
    if (edocument.requiredFiles[i].required) {
      formTabAplicationDocuments.at(i).get('files')?.setValidators(ArrayValidators.minLength(1));
      formTabAplicationDocuments.at(i).get('files')?.updateValueAndValidity();
    }
  }

  const formTabPowers = form.get('tabPowers')?.get('documentos') as FormArray;
  const tabPowers = getTabPowers();
  for (let i = 0; i < tabPowers.requiredFiles.length; i++) {
    if (tabPowers.requiredFiles[i].required) {
      formTabPowers.at(i).get('files')?.setValidators(ArrayValidators.minLength(1));
      formTabPowers.at(i).get('files')?.updateValueAndValidity();
    }
  }
}
