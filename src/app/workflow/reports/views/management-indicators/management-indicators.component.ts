import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@speed/env/environment';

@Component({
  selector: 'app-management-indicators',
  templateUrl: './management-indicators.component.html',
  styleUrls: ['./management-indicators.component.scss'],
})
export class ManagementIndicatorsComponent implements OnInit {
  public urlReporte!: SafeResourceUrl;
  public showReporte = false;

  public constructor(private domSanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    const url = environment.reporteIndicadoresGestion + '&rs:embed=true&rc:parameters=false';
    this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    this.showReporte = true;
  }

  public reload(): void {
    this.showReporte = false;
    const url = environment.reporteIndicadoresGestion + '&rs:embed=true&rc:parameters=false';
    this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    this.showReporte = true;
  }
}
