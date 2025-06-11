import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HC_Plantilla } from '../../interfaces';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, OnChanges {
  @Input() public documents: HC_Plantilla[] = [];
  @Output() public downloadFile: EventEmitter<string> = new EventEmitter();
  public groupedDocuments: { [key: string]: HC_Plantilla[] } = {};
  public openFolders: { [key: string]: boolean } = {};
  public folderKeys: string[] = [];

  public ngOnInit() {
    this.groupDocumentsByFolder();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['documents']) {
      this.groupDocumentsByFolder();
    }
  }

  public groupDocumentsByFolder() {
    this.groupedDocuments = {};
    this.documents.forEach((doc) => {
      if (!this.groupedDocuments[doc.carpeta]) {
        this.groupedDocuments[doc.carpeta] = [];
      }
      this.groupedDocuments[doc.carpeta].push(doc);
    });
    this.folderKeys = Object.keys(this.groupedDocuments);
  }

  public toggleFolder(folder: string) {
    this.openFolders[folder] = !this.openFolders[folder];
  }

  public downloadDocument(ruta: string) {
    this.downloadFile.emit(ruta);
  }
}
