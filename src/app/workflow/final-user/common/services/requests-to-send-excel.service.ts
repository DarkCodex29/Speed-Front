import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ISearchResponseRequestsToSend } from '../../views/requests-to-send/common/interfaces';
@Injectable()
export class RequestsToSendExcelService {
  private workbook!: Workbook;

  public downloadExcel(dataExcel: ISearchResponseRequestsToSend[]): void {
    this.workbook = new Workbook();
    this.createRequestsToSendTable(dataExcel);
    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'export.xlsx');
    });
  }

  private createRequestsToSendTable(data: ISearchResponseRequestsToSend[]) {
    //Crea hoja
    const sheet = this.workbook.addWorksheet();

    ['A', 'B', 'C', 'D', 'E'].forEach((columnKey) => {
      sheet.getColumn(columnKey).width = 40;
      sheet.getColumn(columnKey).alignment = {
        shrinkToFit: false,
        wrapText: false,
      };
    });
    //Crea titulos de cabecera
    const headerRow = sheet.getRow(1);
    headerRow.values = ['Número', 'Compañía', 'Contraparte', 'Fecha Solicitud', 'Proceso'];
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

      row.values = [itemData.numero, itemData.nombreCompania, itemData.nombreContraparte, itemData.fechaCreacion, itemData.proceso];
    }
  }
}
