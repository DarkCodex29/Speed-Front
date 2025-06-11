import { ProcessType } from '../enums';
import { ITabDocuments } from '../interfaces';

export function getTabApplicationDocuments(processType: ProcessType, documentType?: string): ITabDocuments {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const structure: ITabDocuments = {
    code: 4,
    documentType: 'Documentos Solicitud',
    subject: 'Documentos Solicitud',
    requiredFiles: [],
  };

  if (processType === ProcessType.CONTRATO) {
    const documents = [
      {
        name: 'Propuesta Técnica Económica',
        required: true,
        files: [],
      },
      {
        name: 'Comunicación de Adjudicación',
        required: true,
        files: [],
      },
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ];
    structure.requiredFiles.push(...documents);
  } else if (processType === ProcessType.ADENDA) {
    const documents = [
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ];
    structure.requiredFiles.push(...documents);
  } else if (processType === ProcessType.ADENDA_AUTOMATICA) {
    const codAdendaUnilateral = '56';
    console.log(documentType);
    if (documentType === codAdendaUnilateral) {
      const documents = [
        {
          name: 'Carta Resolución',
          required: true,
          files: [],
        },
      ];
      structure.requiredFiles.push(...documents);
    }else{
      const documents = [
        {
          name: 'Otros (Opcional)',
          required: false,
          files: [],
        },
      ];
      structure.requiredFiles.push(...documents);
    }   
    
  }


  return structure;
}

export function getTabContract(): ITabDocuments {
  return {
    code: 7,
    documentType: 'Contrato',
    subject: 'Contrato',
    requiredFiles: [
      {
        name: 'Documento Elaborado',
        required: false,
        files: [],
      },
      {
        name: 'Documento Firmado',
        required: true,
        files: [],
      },
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ],
  };
}

export function getTabApplicationDocumentsForManualRegister(): ITabDocuments {
  return {
    code: 4,
    documentType: 'Documentos Solicitud',
    subject: 'Documentos Solicitud',
    requiredFiles: [
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
      {
        name: 'Comunicación de Adjudicación',
        required: false,
        files: [],
      },
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ],
  };
}

//TabDocuments for Manual Adendum Regiter
export function getTabApplicationDocumentsForManualAdendumRegister(): ITabDocuments {
  return {
    code: 4,
    documentType: 'Documentos Solicitud',
    subject: 'Documentos Solicitud',
    requiredFiles: [
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ],
  };
}
export function getAdendumDocumentsForManualRegister(): ITabDocuments {
  return {
    code: 8,
    documentType: 'Adenda',
    subject: 'Adenda',
    requiredFiles: [
      {
        name: 'Documento Elaborado',
        required: false,
        files: [],
      },
      {
        name: 'Documento Firmado',
        required: true,
        files: [],
      },
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ],
  };
}

export function getTabPowersForManualRegister(): ITabDocuments {
  return {
    code: 5,
    documentType: 'Poderes',
    subject: 'Poderes',
    requiredFiles: [
      {
        name: 'Vigencia de Poder',
        required: false,
        files: [],
      },
      {
        name: 'Copia de DNI',
        required: false,
        files: [],
      },
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ],
  };
}

export function getTabPowers(): ITabDocuments {
  return {
    code: 5,
    documentType: 'Poderes',
    subject: 'Poderes',
    requiredFiles: [
      {
        name: 'Vigencia de Poder',
        required: true,
        files: [],
      },
      {
        name: 'Copia de DNI',
        required: true,
        files: [],
      },
      {
        name: 'Otros (Opcional)',
        required: false,
        files: [],
      },
    ],
  };
}
