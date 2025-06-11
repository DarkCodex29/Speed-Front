import { Component, Input } from '@angular/core';
import { IResponseFile, ITabDocuments } from '@speed/common/interfaces';
import { FileService } from '../../services';
import { SpinnerOverlayService } from '@speed/common/services';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentsTabModel } from '@speed/common/models';

@Component({
  selector: 'ui-documents-upload',
  templateUrl: 'documents-upload.component.html',
  styleUrls: ['documents-upload.component.scss'],
  providers: [FileService],
})
export class DocumentUploadComponent {
  @Input() public infoTab?: ITabDocuments;
  @Input() public form!: FormGroup<DocumentsTabModel>;
  @Input() public edocumentForm!: FormGroup;
  
  public constructor(
    private fileService: FileService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onUpload(event: any, i: number) {
    this.spinnerService.show();
    const fileUpload = event.target.files[0];
    const formData = new FormData();
    formData.append('archivoSubir', fileUpload);
    this.fileService.uploadFile(formData).subscribe((response: IResponseFile) => {
      event.target.value = '';
      this.infoTab?.requiredFiles[i].files.push({
        name: response.archivo,
        path: response.nombreArchivoDisco,
        size: (fileUpload.size * 0.00097656).toFixed(2),
      });

      const control = new FormControl(response.nombreArchivoDisco + '-' + (i + 1), Validators.required);
      ((this.form.get('documentos') as FormArray).at(i).get('files') as FormArray).push(control);
      this.spinnerService.hide();
    });
  }

  public isInvalidControlDocument(index: number): boolean {
    // return (
    //   ((this.form.get('documentos') as FormArray).at(index).get('files')?.invalid &&
    //     (this.form.get('documentos') as FormArray).at(index).get('files')?.touched) ||
    //   false
    // );
    return true;
  }

  public deleteFileUpload(indexType: number, position: number) {
    const params = {
      file: ((this.form.get('documentos') as FormArray).at(indexType).get('files') as FormArray).at(position).value,
    };
    this.fileService.deleteFile(params).subscribe(() => {
      ((this.form.get('documentos') as FormArray).at(indexType).get('files') as FormArray).removeAt(position);
      this.infoTab?.requiredFiles[indexType].files.splice(position, 1);
    });
  }
}
