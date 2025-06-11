import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { ISearchResponseInbox } from '../../views/inbox/common/interfaces';
import * as fs from 'file-saver';
@Injectable()
export class InboxExcelService {
  private workbook!: Workbook;

  public downloadExcel(dataExcel: ISearchResponseInbox[]): void {
    this.workbook = new Workbook();
    this.createInboxTable(dataExcel);
    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'export.xlsx');
    });
  }

  private createInboxTable(data: ISearchResponseInbox[]) {
    //Crea hoja
    const sheet = this.workbook.addWorksheet();

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((columnKey) => {
      sheet.getColumn(columnKey).width = 40;
      sheet.getColumn(columnKey).alignment = {
        shrinkToFit: false,
        wrapText: false,
      };
    });
    //Crea titulos de cabecera
    const headerRow = sheet.getRow(1);
    headerRow.values = [
      'Número',
      'Compañía',
      'Contraparte',
      'Sumilla',
      'Estado',
      'Fecha de Solicitud',
      'Fecha del 1er Borrador',
      'Proceso',
    ];
    headerRow.height = 40;
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.font = {
      bold: true,
      color: { argb: 'FFFFFF' },
    };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ff4f81bd' },
    };

    const rowsToInsert = sheet.getRows(2, data.length)!;

    for (let index = 0; index < rowsToInsert?.length; index++) {
      const itemData = data[index];
      const row = rowsToInsert[index];

      row.values = [
        itemData.numero,
        itemData.nombreCompania,
        itemData.razonSocial,
        itemData.sumilla,
        itemData.estado,
        itemData.fechaSolicitud,
        itemData.fechaBorrador,
        itemData.nombreProceso,
      ];
    }
  }
}
