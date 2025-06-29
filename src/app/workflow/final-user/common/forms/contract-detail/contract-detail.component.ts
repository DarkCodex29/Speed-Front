import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DialogService } from '@speed/common/dialog';
import { ITabModel } from '@speed/common/interfaces';
import {
  AcceptRequestModalComponent,
  AdendaDataModalComponent,
  AttachDocumentModalComponent,
  ContratoDataModalComponent,
  DeleteDocumentModalComponent,
  MessageModalComponent,
  ObserveRequestModalComponent,
  ReopenModalComponent,
  ResendSignatureNotificationModalComponent,
  SendRequestModalComponent,
  SendToSignatureModalComponent,
  VisatorsModalComponent,
  VoidFileModalComponent,
} from '@speed/common/modals';
import { ConfigureAlarmsModalComponent } from '@speed/common/modals/configure-alarms-modal';
import { TraceModalComponent } from '@speed/common/modals/trace-modal';
import { SpinnerOverlayService } from '@speed/common/services';
import { DocumentService, InboxService, PendingService, RequestsService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { RequestsToSendService } from '../../services/requests-to-send.service';
import { AttachDraftModalComponent } from '@speed/common/modals/attach-draft-modal';
import { SendVisaModalComponent } from '@speed/common/modals/send-visa-modal/send-visa-modal.component';
import { ApprovementModalComponent } from '@speed/common/modals/approvement-modal/approvement-modal.component';
import { SendEletronicSignatureModalComponent } from '@speed/common/modals/send-electronic-signature-modal/send-electronic-signature-modal.component';
import { CommunicateStakeholdersContainer } from '@speed/common/modals/communicate-stakeholders-modal';
import { SearchDocumentService } from '../../services/search-document.service';
import { ObserveVisaModalComponent } from '@speed/common/modals/observe-visa-modal/observe-visa-modal.component';
import { AttachFileModalComponent } from '@speed/common/modals/attach-file-modal';
import { ShowVisatorsModalComponent } from '@speed/common/modals/show-visators-modal/show-visators-modal.component';
import { SecurityModalComponent } from '@speed/common/modals/security-modal/security-modal.component';
import { DeliveryDocumentModalComponent } from '@speed/common/modals/delivery-document-modal/delivery-document-modal.component';
import { CancelVisaModalComponent } from '@speed/common/modals/cancel-visa-modal/cancel-visa-modal.component';
import { environment } from '@speed/env/environment';
import { GenerateAddendumTemplateComponent } from '@speed/common/modals/generate-addendum-template-modal/generate-addendum-template-modal.component';
import { AttachSignedFileModalComponent } from '@speed/common/modals/save-file-signed-modal';
import { UserRepService } from '../../services/user-rep.service';
import { LoginService } from 'src/app/authentication/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';
import * as pdfjsLib from 'pdfjs-dist';
import { PdfViewerComponent } from '@speed/common/modals/pdf-viewer/pdf-viewer.component';
/**
 * Componente para mostrar los detalles de un contrato/solicitud
 *
 * SISTEMA DE VISIBILIDAD DE CARPETAS IMPLEMENTADO:
 *
 * Este componente implementa un sistema complejo de visibilidad de carpetas
 * basado en roles de usuario y estados de solicitud.
 *
 * MÉTODOS PRINCIPALES RELACIONADOS CON VISIBILIDAD:
 * - showCarpeta(): Determina si una carpeta debe mostrarse según rol y estado
 * - changeIndexDocumento(): Maneja la restricción de archivos en Borradores
 *
 * ROLES RECONOCIDOS:
 * - 'ZSLG:RESP_LEGAL:HOC': Rol de abogado (sistema legacy)
 * - 'abogadoResponsable': Rol de abogado (sistema actual)
 *
 * Para más detalles sobre las reglas de visibilidad, ver documentación
 * en los métodos showCarpeta() y changeIndexDocumento()
 */
@Component({
  selector: 'ui-contract-detail',
  templateUrl: 'contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss'],
  providers: [InboxService, PendingService, RequestsService, RequestsToSendService, DocumentService, SearchDocumentService],
})
export class ContractDetailComponent implements OnDestroy, OnInit {
  @Input() public contract!: ITabModel;
  @Input() public tipoBandeja?: number = 1;
  @Output() public readonly closeTab: EventEmitter<boolean>;
  @Output() public readonly reloadList: EventEmitter<boolean>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() public readonly openVerDocumento: EventEmitter<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dataDocumento?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data?: any; //TODO pendiente tipadof
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public documentos!: any[];
  public nombreUsuario = '';
  public idUsuario = '';
  public loading = true;
  public idDocumentInfo = -1;
  public loadingDocumentDetail = false;
  public indiceDocumento: number | null = null;
  public flagShowButtonsCarpeta = true;
  private unsubscribe: Subject<void>;
  label = '';

  public constructor(
    private dialogService: DialogService,
    private inboxService: InboxService,
    private spinnerService: SpinnerOverlayService,
    private documentService: DocumentService,
    private pendingService: PendingService,
    private requestsService: RequestsService,
    private requestsToSendService: RequestsToSendService,
    private searchDocumentService: SearchDocumentService,
    private loginService: LoginService,
  ) {
    this.closeTab = new EventEmitter();
    this.reloadList = new EventEmitter();
    this.openVerDocumento = new EventEmitter();
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.js';
    this.loading = true;
    this.nombreUsuario = this.loginService.getUserInfo().nombre ?? '';
    this.idUsuario = this.loginService.getUserInfo().usuario ?? '';
    await this.recoverData();
    this.loading = false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public async verContrato() {
    const param = await this.inboxService.obtenerTrazaAdendaContrato(this.data.expediente.id);
    this.openVerDocumento.emit(param);
  }

  public openModalDatosContrato() {
    this.dialogService
      .show({
        component: ContratoDataModalComponent,
        config: {
          data: {
            idTraza: this.data.idTraza,
            idExpediente: this.data.expediente.id,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean; changeResponsible: boolean };
        if (response.changeResponsible) {
          this.closeTab.emit(true);
        }
        if (response.modified) {
          this.recoverData();
          this.reloadList.emit(true);
        }
      });
  }

  public openAttachmentSignedFile() {
    this.dialogService
      .show({
        component: AttachSignedFileModalComponent,
        config: {
          data: this.idDocumentInfo,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean };
        if (response.modified) {
          this.recoverData();
          this.reloadList.emit(true);
        }
      });
  }
  public openAttachmentFile() {
    this.dialogService
      .show({
        component: AttachFileModalComponent,
        config: {
          data: this.idDocumentInfo,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean };
        if (response.modified) {
          this.recoverData();
          this.reloadList.emit(true);
        }
      });
  }
  public openModalEliminarDocumento() {
    this.dialogService
      .show({
        component: DeleteDocumentModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
            numero: this.data.documentoLegal.numero,
            accion: 'Eliminar',
            eliminarSolicitud: false,
          },
        },
      })
      .afterClosed.subscribe((action) => {
        const response = action;
        if (response) {
          this.closeTab.emit(true);
        }
      });
  }
  public openModalCancelarVisado() {
    this.dialogService
      .show({
        component: CancelVisaModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.subscribe((action) => {
        const response = action;
        if (response) {
          this.closeTab.emit(true);
        }
      });
  }
  public generarPlantillaNuevo() {
    this.spinnerService.show();
    this.documentService.downloadPlatillaDocument({ idDocumento: this.idDocumentInfo }).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        const fileName = response.headers.get('Content-Disposition')?.split(';')[1].split('=')[1];
        const blob: Blob = response.body as Blob;
        const a = document.createElement('a');
        a.download = fileName ?? '';
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: () => {
        this.spinnerService.hide();
        this.dialogService.show({
          component: MessageModalComponent,
          config: {
            data: {
              message: 'No existe la plantilla',
            },
          },
        });
      },
    });
  }

  public descargaArchivo(idArchivo: number) {
    //this.downloadFile(idArchivo);
    this.spinnerService.show();
    const idExpediente = this.data.expediente.id;
    this.documentService.downloadFileUser(idArchivo, idExpediente).subscribe({
      next: (response) => {
        this.spinnerService.hide();
        const filename = String(response.headers.get('Content-Disposition')?.split('=')[1]?.slice(1, -1));
        const blob: Blob = response.body as Blob;

        if (filename.split('.').reverse()[0] === 'pdf') {
          //this.descargarPdf(filename, blob, idArchivo);
          window.open(this.documentService.downloadFileUserURL(idArchivo, idExpediente), '_blank');
        } else {
          this.descargarArchivoGeneral(filename, blob);
        }
      },
      error: () => {
        this.spinnerService.hide();
        this.dialogService.show({
          component: MessageModalComponent,
          config: {
            data: {
              message: 'Hubo un error al descargar el archivo',
            },
          },
        });
      },
    });
  }

  public descargarArchivoGeneral(filename: string, blob: Blob) {
    const a = document.createElement('a');
    a.download = filename ?? '';
    a.setAttribute('href', window.URL.createObjectURL(blob));
    a.setAttribute('target', '_blank');
    a.innerHTML = 'SomeText';
    document.body.appendChild(a);
    a.click();
  }
  public downloadFile(idArchivo: number) {
    const fileURL = String(environment.apiUrl + '/descargarArchivo/' + idArchivo + '/');
    window.open(fileURL, '_blank');
  }

  public descargarPdf(filename: string, blob: Blob, idArchivo: number) {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const pdfUrl = URL.createObjectURL(blob);
      setTimeout(() => {
        newWindow.document.title = filename;
        // eslint-disable-next-line max-len
        newWindow.document.write(`
          <html>
            <head>
              <title>${filename}</title>
            </head>
            <body>
              <h2>Visor de PDF</h2>
              <iframe src="${pdfUrl}" width="100%" height="80%" style="border: none;"></iframe>
              <br>
              <!-- Botón para descargar el archivo PDF -->
              <a href="${pdfUrl}" download="${filename}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Descargar PDF
              </a>
            </body>
          </html>
        `);
        newWindow.onload = () => {
          URL.revokeObjectURL(pdfUrl);
        };
      }, 100);
    }
  }

  public callFunction(item: any) {
    this.label =
      (this.indiceDocumento == this.getIndiceAdenda() || this.indiceDocumento == this.getIndiceContrato()) &&
      item.nombre == 'Adjuntar Borrador'
        ? 'Adjuntar Versión Final'
        : item.nombre == 'Adjuntar Borrador'
        ? 'Adjuntar Archivo'
        : item.nombre;

    if (item.urlNuevo) {
      this[`${item.urlNuevo}` as keyof ContractDetailComponent]();
    }
  }

  public openModalDatosAdenda() {
    this.dialogService
      .show({
        component: AdendaDataModalComponent,
        config: {
          data: {
            idTraza: this.data.idTraza,
            idExpediente: this.data.expediente.id,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean; changeResponsible: boolean };
        if (response.changeResponsible) {
          this.closeTab.emit(true);
        }
        if (response.modified) {
          this.recoverData();
          this.reloadList.emit(true);
        }
      });
  }

  public openModalVerHistoria() {
    this.dialogService.show({
      component: TraceModalComponent,
      config: {
        data: this.data.expediente.id,
      },
    });
  }

  public openModalAceptarSolicitud() {
    this.dialogService
      .show({
        component: AcceptRequestModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.recoverData();
            this.reloadList.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }
  public openModalDeliveryDocument() {
    this.dialogService
      .show({
        component: DeliveryDocumentModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean };
        if (response.modified) {
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Se guardó correctamente',
              },
            },
          });
          this.recoverData();
        }
      });
  }
  public openModalObservarSolicitud() {
    this.dialogService
      .show({
        component: ObserveRequestModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean };
        if (response.modified) {
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Se guardó correctamente',
              },
            },
          });
          this.closeTab.emit(true);
        }
      });
  }
  public openModalObservarVisado() {
    this.dialogService
      .show({
        component: ObserveVisaModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean };
        if (response.modified) {
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Se observó correctamente',
              },
            },
          });
          this.closeTab.emit(true);
        }
      });
  }

  public enviarVisadoProcess() {
    this.dialogService
      .show({
        component: SendVisaModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.closeTab.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalSeguridad() {
    this.dialogService
      .show({
        component: SecurityModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.recoverData();
            this.reloadList.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalEnviarVisado() {
    this.spinnerService.show();
    this.inboxService
      .validarArchivoPdfParaEnviarVisado({
        idExpediente: this.data.expediente.id,
      })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          this.enviarVisadoProcess();
        },
        error: (e) => {
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: e.error.message,
              },
            },
          });
        },
      });
  }
  public openModalGenerateTemplateAddendum() {
    this.dialogService.show({
      component: GenerateAddendumTemplateComponent,
      config: {
        data: this.idDocumentInfo,
      },
    });
  }

  public openModalEnviarFirmaElectronica() {
    this.dialogService
      .show({
        component: SendEletronicSignatureModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
            reenvio: false,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.closeTab.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalReenviarFirmaElectronica() {
    this.dialogService
      .show({
        component: SendEletronicSignatureModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
            reenvio: true,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.recoverData();
            this.reloadList.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalNotificarDocumentoFirmado() {
    this.dialogService
      .show({
        component: ResendSignatureNotificationModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.recoverData();
            this.reloadList.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalAprobar() {
    this.dialogService
      .show({
        component: ApprovementModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
            nombre: this.data.expediente.proceso.nombre + ' número ' + this.data.documentoLegal.numero,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.recoverData();
            this.closeTab.emit(true);
            //this.reloadList.emit(true);//joel
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalEnviarAFirma() {
    this.dialogService
      .show({
        component: SendToSignatureModalComponent,
        config: {
          data: {
            idExpediente: this.data.expediente.id,
            nombre: this.data.expediente.proceso.nombre + ' número ' + this.data.documentoLegal.numero,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        if (action) {
          const response = action as { success: boolean; message: string };
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.recoverData();
            this.reloadList.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalAdjuntarDocumento() {
    this.dialogService
      .show({
        component: AttachDocumentModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        if (response) {
          this.recoverData();
          this.reloadList.emit(true);
        }
      });
  }

  public openModalConfigurarAlarmas() {
    this.dialogService.show({
      component: ConfigureAlarmsModalComponent,
      config: {
        data: {
          idDocumentoLegal: this.data.documentoLegal.id,
          idExpediente: this.data.expediente.id,
        },
      },
    });
  }

  public openModalAdjuntarBorrador() {
    const indDoc = this.indiceDocumento ? this.indiceDocumento : 1; //joel
    console.log(this.contract.code);
    this.dialogService
      .show({
        component: AttachDraftModalComponent,
        config: {
          data: {
            id: this.idDocumentInfo,
            cant: this.dataDocumento.lstArchivos.length,
            archivosExistentes: this.dataDocumento.lstArchivos,
            //num: this.contract.code,joel
            num: this.data.documentoLegal.numero,
            idProceso: this.data.expediente.proceso.id,
            tipoDocumento: this.documentos[indDoc].tipoDocumento.id,
            documentoObjeto: this.documentos[indDoc].tipoDocumento,
          },
          title: this.label,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (response) => {
        if (response) {
          await this.recoverData();
          this.reloadList.emit(true);
        }
      });
  }

  public openModalVisadores() {
    this.dialogService.show({
      component: VisatorsModalComponent,
      config: {
        data: this.data.expediente.id,
      },
    });
  }

  public openModalComunicarIntersados() {
    this.dialogService
      .show({
        component: CommunicateStakeholdersContainer,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        if (response) {
          this.recoverData();
          this.closeTab.emit(true);
          this.reloadList.emit(true);
        }
      });
  }

  public openModalEnviarSolicitud() {
    this.dialogService
      .show({
        component: SendRequestModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { success: boolean };
        if (response) {
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'La solicitud fue enviada exitósamente',
                },
              },
            });
            this.closeTab.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Ocurrió un error, vuelva a intentarlo más tarde.',
                },
              },
            });
          }
        }
      });
  }

  public openModalAnularArchivo() {
    // Validar si hay archivos disponibles
    if (!this.dataDocumento?.lstArchivos || this.dataDocumento.lstArchivos.length === 0) {
      this.dialogService.show({
        component: MessageModalComponent,
        config: {
          data: {
            message: 'No hay archivos disponibles para anular.',
          },
        },
      });
      return;
    }

    this.dialogService
      .show({
        component: VoidFileModalComponent,
        config: {
          data: this.dataDocumento.lstArchivos,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { success: boolean };
        if (response) {
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Archivo eliminado exitósamente',
                },
              },
            });
            // this.closeTab.emit(true);
            this.recoverData();
            this.reloadList.emit(true);
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Ocurrió un error, vuelva a intentarlo más tarde.',
                },
              },
            });
          }
        }
      });
  }

  public openModalReabrir() {
    this.dialogService
      .show({
        component: ReopenModalComponent,
        config: {
          data: this.data.expediente.id,
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { success: boolean; message: string; modified: boolean };
        if (response.modified) {
          if (response.success) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
            this.closeTab.emit(true);
            //this.recoverData();
          } else {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.message,
                },
              },
            });
          }
        }
      });
  }

  public openModalVerHojaVisadores() {
    this.dialogService.show({
      component: ShowVisatorsModalComponent,
      config: {
        data: this.data.documentoLegal.id,
      },
    });
  }
  /**
   * Cambia el índice del documento seleccionado y carga sus detalles
   *
   * FUNCIONALIDAD ESPECIAL PARA BORRADORES:
   * - Los usuarios SIN rol de abogado en la carpeta Borradores (ID: 12)
   *   solo pueden ver el último archivo (más reciente por fecha de creación)
   * - Los archivos se ordenan por fecha de creación antes del filtrado
   * - Los usuarios CON rol de abogado ven todos los archivos
   *
   * @param indice - Índice del documento en la lista
   * @param id - ID del documento a cargar
   */
  public async changeIndexDocumento(indice: number, id: number) {
    if (this.indiceDocumento != indice) {
      this.indiceDocumento = indice;
      this.loadingDocumentDetail = true;
      this.spinnerService.show();
      this.idDocumentInfo = id;
      this.dataDocumento = await this.documentService.getDocumento(this.idDocumentInfo);

      // Detectar rol de abogado y tipo de documento
      const rolesUsuario = this.loginService.getUserInfo().rolesUsuario;
      const isAbogado = rolesUsuario?.includes('ZSLG:RESP_LEGAL:HOC') || rolesUsuario?.includes('abogadoResponsable');
      const tipoDocumentoId = this.data.documentos[indice].tipoDocumento.id;

      // RESTRICCIÓN ESPECIAL: En Borradores (ID: 12), usuarios sin rol abogado solo ven el último archivo
      if (!isAbogado && tipoDocumentoId === 12 && this.dataDocumento.lstArchivos?.length > 0) {
        // Ordenar archivos por fecha de creación (más reciente primero)
        const archivosOrdenados = this.dataDocumento.lstArchivos.sort((a: any, b: any) => {
          const fechaA = new Date(a.fechaCreacion).getTime();
          const fechaB = new Date(b.fechaCreacion).getTime();
          return fechaB - fechaA; // Orden descendente (más reciente primero)
        });

        // Mantener solo el archivo más reciente (primer elemento después del ordenamiento)
        this.dataDocumento.lstArchivos = [archivosOrdenados[0]];
      }

      this.loadingDocumentDetail = false;
      this.spinnerService.hide();
      this.validateShowButtonsCarpeta(indice);
    }
  }

  public validateShowButtonsCarpeta(indice: number) {
    this.flagShowButtonsCarpeta = true;
    const tipoDocumento = this.data.documentos[indice].tipoDocumento.id;

    //validamos si la carpeta es borrador y el estado es diferente de doc. elabarado.
    if (tipoDocumento === 12 && !['Doc. Elaborado', 'En Elaboracion'].includes(this.data.estadoDl)) {
      this.flagShowButtonsCarpeta = false;
    }

    //si es contrato y diferente usuario al responsable no muestra botones.
    if (tipoDocumento === 7 && this.data.documentoLegal.responsable.nombreCompleto !== this.nombreUsuario) {
      this.flagShowButtonsCarpeta = false;
    }

    //si es adenda y diferente usuario al responsable no muestra botones.
    if (tipoDocumento === 8 && this.data.documentoLegal.responsable.nombreCompleto !== this.nombreUsuario) {
      this.flagShowButtonsCarpeta = false;
    }
  }

  private async recoverData() {
    try {
      this.spinnerService.show();
      if (this.contract.isVerContratoButton) {
        const response = await Promise.all([this.inboxService.obtenerDetalleExpediente(this.contract.id)]);
        this.data = response[0];
      } else {
        if (this.tipoBandeja == 1) {
          // Bandeja
          const response = await Promise.all([this.inboxService.obtenerDetalleContrato(this.contract.id)]);
          this.data = response[0];
        } else if (this.tipoBandeja == 2) {
          // Pendientes
          const response = await Promise.all([this.pendingService.obtenerDetalleContrato(this.contract.id)]);
          this.data = response[0];
        } else if (this.tipoBandeja == 3) {
          // Solicitudes
          const response = await Promise.all([this.requestsService.obtenerDetalleContrato(this.contract.id)]);
          this.data = response[0];
        } else if (this.tipoBandeja == 4) {
          const response = await Promise.all([this.requestsToSendService.obtenerDetalleContrato(this.contract.id)]);
          this.data = response[0];
        } else if (this.tipoBandeja == 5) {
          // Buscar documento
          const response = await Promise.all([this.searchDocumentService.obtenerDetalleContrato(this.contract.id)]);
          this.data = response[0];
        }
      }

      if (this.idDocumentInfo != -1) {
        this.loadingDocumentDetail = true;
        this.dataDocumento = await this.documentService.getDocumento(this.idDocumentInfo);
        this.loadingDocumentDetail = false;
      }
      this.documentos = this.data.documentos;
      this.spinnerService.hide();
      console.log(this.data);
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public disabled(boton: any) {
    let index = this.data?.documentos?.findIndex((d: any) => d.tipoDocumento.id == 7 || d.tipoDocumento.id == 8);
    if (index > -1) {
      return this.data.documentos[index].archivos.length == 0 && boton.url == 'enviarVisado';
    } else {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public getIndiceVF() {
    return this.data.documentos.findIndex((d: any) => d.titulo.split(' ')[1] == 'Final');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public getIndiceAdenda() {
    return this.data.documentos.findIndex((d: any) => d.titulo.split(' ').includes('Adenda'));
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public getIndiceContrato() {
    return this.data.documentos.findIndex((d: any) => d.titulo.split(' ').includes('Contrato'));
  }

  /**
   * Determina la visibilidad de las carpetas de documentos basada en roles de usuario y estados de solicitud
   *
   * SISTEMA DE VISIBILIDAD DE CARPETAS POR ROLES:
   *
   * CARPETAS DISPONIBLES:
   * - ID 4: Documentos Solicitud
   * - ID 5: Poderes
   * - ID 7: Contrato
   * - ID 8: Adenda
   * - ID 12: Borradores
   * - ID 13: Versión Final
   *
   * ROLES DE USUARIO:
   * - Abogado: Usuario con rol 'ZSLG:RESP_LEGAL:HOC' o 'abogadoResponsable'
   * - No Abogado: Cualquier otro usuario
   *
   * ESTADOS DE SOLICITUD RELEVANTES:
   * - "En Elaboracion" / "En Elaboración"
   * - "Doc. Elaborado" / "Doc. elaborado"
   * - "Enviado a Visado"
   *
   * REGLAS DE VISIBILIDAD:
   *
   * 1. SIEMPRE OCULTA:
   *    - Versión Final (ID: 13) → Nunca visible para ningún usuario
   *
   * 2. USUARIO CON ROL ABOGADO:
   *    - Documentos Solicitud (ID: 4) → Siempre visible
   *    - Poderes (ID: 5) → Siempre visible
   *    - Contrato (ID: 7) → Siempre visible
   *    - Adenda (ID: 8) → Siempre visible
   *    - Borradores (ID: 12) → Siempre visible
   *
   * 3. USUARIO SIN ROL ABOGADO:
   *    3.1 SIEMPRE VISIBLE:
   *        - Documentos Solicitud (ID: 4)
   *        - Poderes (ID: 5)
   *
   *    3.2 OCULTA EN ESTADOS ESPECÍFICOS:
   *        - Contrato (ID: 7) → Oculta si estado es "En Elaboración" o "Doc. elaborado"
   *        - Adenda (ID: 8) → Oculta si estado es "En Elaboración" o "Doc. elaborado"
   *
   *    3.3 OCULTA EN ESTADO VISADO:
   *        - Borradores (ID: 12) → Oculta si estado es "Enviado a Visado"
   *
   * FUNCIONALIDAD ADICIONAL:
   * - En la carpeta Borradores (ID: 12), los usuarios sin rol abogado solo ven el último archivo
   *   (más reciente por fecha de creación - Implementado en el método changeIndexDocumento)
   *
   * @param item - Objeto que contiene la información de la carpeta, incluyendo tipoDocumento.id
   * @returns boolean - true si la carpeta debe ser visible, false si debe ocultarse
   */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public showCarpeta(item: any): boolean {
    const rolesUsuario = this.loginService.getUserInfo().rolesUsuario;
    const tipoDocumentoId = item.tipoDocumento?.id;
    const estadoDl = this.data.estadoDl;

    // Detectar si el usuario tiene rol de abogado
    const isAbogado = rolesUsuario?.includes('ZSLG:RESP_LEGAL:HOC') || rolesUsuario?.includes('abogadoResponsable');

    // REGLA 1: Versión Final (ID: 13) siempre está oculta para todos los usuarios
    if (tipoDocumentoId === 13) {
      return false;
    }

    // REGLA 2: Usuario CON rol de abogado - puede ver todas las carpetas principales
    if (isAbogado) {
      const carpetasAbogado = [4, 5, 7, 8, 12]; // Documentos Solicitud, Poderes, Contrato, Adenda, Borradores
      return carpetasAbogado.includes(tipoDocumentoId);
    }

    // REGLA 3: Usuario SIN rol de abogado - visibilidad condicionada por estado
    else {
      // 3.1 Carpetas siempre visibles para no-abogado
      if ([4, 5].includes(tipoDocumentoId)) {
        // Documentos Solicitud, Poderes
        return true;
      }

      // 3.2 Contrato y Adenda - ocultas en estados de elaboración
      if ([7, 8].includes(tipoDocumentoId)) {
        // Contrato, Adenda
        const estadosOcultos = ['En Elaboracion', 'En Elaboración', 'Doc. Elaborado', 'Doc. elaborado'];
        return !estadosOcultos.includes(estadoDl);
      }

      // 3.3 Borradores - oculta cuando está en visado
      if (tipoDocumentoId === 12) {
        // Borradores
        return estadoDl !== 'Enviado a Visado';
      }

      // Cualquier otra carpeta no especificada se oculta para no-abogado
      return false;
    }
  }
}
