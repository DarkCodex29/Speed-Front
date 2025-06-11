import { Injectable } from '@angular/core';
import { IDocumentoOutput, IDocumentoSearchDashOutput } from '@speed/common/interfaces/output';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable()
export class SearchDocumentExcelService {
  private workbook!: Workbook;

  public downloadExcel(dataExcel: IDocumentoOutput[]): void {
    this.workbook = new Workbook();
    this.createRequestsTable(dataExcel);
    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'export.xlsx');
    });
  }

  public downloadExcelDashboard(dataExcel: IDocumentoSearchDashOutput[]): void {
    this.workbook = new Workbook();
    this.createDashboardTable(dataExcel);
    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'export_dashboard.xlsx');
    });
  }

  private createRequestsTable(data: IDocumentoOutput[]) {
    const sheet = this.workbook.addWorksheet('Requests');

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'].forEach((columnKey) => {
      sheet.getColumn(columnKey).width = 40;
      sheet.getColumn(columnKey).alignment = {
        shrinkToFit: false,
        wrapText: false,
      };
    });

    const headerRow = sheet.getRow(1);
    headerRow.values = [
      'Número de documento',
      'Sumilla',
      'Compañia',
      'Contraparte',
      'Solicitante',
      'Abogado Responsable',
      'Estado',
      'Moneda',
      'Monto',
      'Fecha Inicio',
      'Fecha Vencimiento',
      'País',
      'Ubicación',
      'Área',
    ];
    headerRow.height = 40;
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.font = {
      bold: true,
      color: { argb: 'FFFFFF' },
    };

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1'].forEach((key) => {
      sheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ff4f81bd' },
      };
      sheet.getCell(key).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const rowsToInsert = sheet.getRows(2, data.length)!;

    for (let index = 0; index < rowsToInsert?.length; index++) {
      const itemData = data[index];
      const row = rowsToInsert[index];

      row.values = [
        itemData.numeroDocumento,
        itemData.sumilla,
        itemData.compania,
        itemData.contraparte,
        itemData.solicitante,
        itemData.responsable,
        itemData.estado,
        itemData.moneda,
        itemData.monto,
        itemData.fechaInicio,
        itemData.fechaVencimiento,
        itemData.pais,
        itemData.ubicacion,
        itemData.area,
      ];
      [
        'A' + String(2 + index),
        'B' + String(2 + index),
        'C' + String(2 + index),
        'D' + String(2 + index),
        'E' + String(2 + index),
        'F' + String(2 + index),
        'G' + String(2 + index),
        'H' + String(2 + index),
        'I' + String(2 + index),
        'J' + String(2 + index),
        'K' + String(2 + index),
        'L' + String(2 + index),
        'M' + String(2 + index),
        'N' + String(2 + index),
      ].forEach((key) => {
        sheet.getCell(key).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        sheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
      });
    }
  }

  private createDashboardTable(data: IDocumentoSearchDashOutput[]) {
    const sheet = this.workbook.addWorksheet('Dashboard');

    ['A', 'B', 'C', 'D', 'E', 'F'].forEach((columnKey) => {
      sheet.getColumn(columnKey).width = 30;
      sheet.getColumn(columnKey).alignment = {
        shrinkToFit: true,
        wrapText: false,
      };
    });

    const headerRow = sheet.getRow(1);
    headerRow.values = ['Número de documento', 'Proceso', 'Área', 'Contraparte', 'Fecha de Solicitud'];
    headerRow.height = 30;
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.font = {
      bold: true,
      color: { argb: 'FFFFFF' },
    };

    ['A1', 'B1', 'C1', 'D1', 'E1'].forEach((key) => {
      sheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ff4f81bd' },
      };
      sheet.getCell(key).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const rowsToInsert = sheet.getRows(2, data.length)!;

    for (let index = 0; index < rowsToInsert?.length; index++) {
      const itemData = data[index];
      const row = rowsToInsert[index];

      row.values = [itemData.numeroDocumento, itemData.proceso, itemData.area, itemData.contraparte, itemData.fechaSolicitud];
      ['A' + String(2 + index), 'B' + String(2 + index), 'C' + String(2 + index), 'D' + String(2 + index), 'E' + String(2 + index)].forEach(
        (key) => {
          sheet.getCell(key).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          sheet.getCell(key).alignment = { vertical: 'middle', horizontal: 'center' };
        },
      );
    }
  }
}
