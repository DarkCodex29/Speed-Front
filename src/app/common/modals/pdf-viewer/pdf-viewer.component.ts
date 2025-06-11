import { NgIf } from '@angular/common';
import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	ViewChild,
  Input,
} from '@angular/core';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
	selector: 'app-pdf-viewer',
	templateUrl: './pdf-viewer.component.html',
	styleUrls: ['./pdf-viewer.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class PdfViewerComponent implements OnInit, OnDestroy {
	@ViewChild('pdfContainer', { static: true }) 
  pdfContainer!: ElementRef<HTMLDivElement>;
  @Input() blob: Blob = new Blob();
  @Input() filename: string = "";
  @Input() data: any;
	private pdfDocument: any;
	private currentPageNumber = 1;
	private scale = 1.5;
	totalPages = 0;
	currentPage = 1;
  isModalOpen: boolean = true;

	constructor(
    private dialogConfig: DialogConfig,
    private dialogRef: DialogRef<unknown>,
  ) {
    this.data = this.dialogConfig.data || {};
  }

	ngOnInit(): void {
    console.log(this.filename);
    console.log(this.data);
		this.loadPdf();
	}

	ngOnDestroy(): void {
		// Cleanup resources when the component is destroyed
	}

 url:string="assets/sample.pdf";
	// Load the PDF file
	async loadPdf() {
		try {
			const pdfjs = pdfjsLib;
			pdfjs.GlobalWorkerOptions.workerSrc =
				'assets/pdf.worker.min.js';

        const pdfUrl = URL.createObjectURL(this.data.blob);
			const loadingTask = pdfjs.getDocument(pdfUrl); // Path to your PDF file
			this.pdfDocument = await loadingTask.promise;
			this.totalPages = this.pdfDocument.numPages;
			this.renderPage(this.currentPageNumber);
		} catch (error) {
			console.error('Error loading PDF:', error);
		}
	}

  downloadPdf() {
    // Usar la URL creada a partir del Blob para descargar
    const pdfUrl = URL.createObjectURL(this.blob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = this.data.filename;  // Nombre del archivo a descargar
    link.click();
  }
	// Render a specific page of the PDF
	async renderPage(pageNumber: number) {
		const page = await this.pdfDocument.getPage(pageNumber);
		const viewport = page.getViewport({ scale: this.scale });

		const container = this.pdfContainer.nativeElement;
		container.innerHTML = ''; // Clear previous content

		const canvas = document.createElement('canvas');
		container.appendChild(canvas);

		const context = canvas.getContext('2d')!;
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		const renderContext = {
			canvasContext: context,
			viewport: viewport,
		};

		await page.render(renderContext).promise;
	}

	// Navigate to the previous page
	goToPrevPage() {
		if (this.currentPageNumber > 1) {
			this.currentPageNumber--;
			this.currentPage = this.currentPageNumber;
			this.renderPage(this.currentPageNumber);
		}
	}

	// Navigate to the next page
	goToNextPage() {
		if (this.currentPageNumber < this.totalPages) {
			this.currentPageNumber++;
			this.currentPage = this.currentPageNumber;
			this.renderPage(this.currentPageNumber);
		}
	}

	// Zoom in the PDF
	zoomIn() {
		this.scale += 0.25;
		this.renderPage(this.currentPageNumber);
	}

	// Zoom out the PDF
	zoomOut() {
		if (this.scale > 0.5) {
			this.scale -= 0.25;
			this.renderPage(this.currentPageNumber);
		}
	}

  public close() {
    this.isModalOpen =false;
  }
}