import { ICounterPartBD } from '../interfaces';
import { LegalRepresentativeModel } from '../models';

export function setLegalRepresentativeModel(item: ICounterPartBD): LegalRepresentativeModel {
  const legalRepresentativeModel = new LegalRepresentativeModel();
  legalRepresentativeModel.idRepresentanteLegal.setValue(item.id);
  legalRepresentativeModel.tipoCliente.setValue(item.tipo?.id);
  legalRepresentativeModel.tipoDocumento.setValue(item.tipo?.nombre);
  legalRepresentativeModel.numeroIdentificacion.setValue(item.numeroIdentificacion);
  legalRepresentativeModel.nombre.setValue(item.nombre);
  legalRepresentativeModel.apellidoPaterno.setValue(item.apellidoPaterno);
  legalRepresentativeModel.apellidoMaterno.setValue(item.apellidoMaterno);
  legalRepresentativeModel.nombreCompleto.setValue(item.label);
  legalRepresentativeModel.correo.setValue(item.correo);
  legalRepresentativeModel.esRepresentante.setValue(item.esRepresentante);
  legalRepresentativeModel.esContraparte.setValue(item.esContraparte);
  legalRepresentativeModel.eliminado.setValue(false);

  return legalRepresentativeModel;
}
