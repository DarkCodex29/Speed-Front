import { AfterViewInit, Component, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ITabModel } from '@speed/common/interfaces';
import { InboxExcelService, InboxService } from '@speed/final-user/common/services';
import { Subject } from 'rxjs';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';

@Component({
  selector: 'app-contract-detail-external',
  templateUrl: './contract-detail-external.component.html',
  styleUrls: ['./contract-detail-external.component.scss'],
  providers: [InboxService, InboxExcelService],
})
export class ContractDetailExternalComponent implements OnDestroy, AfterViewInit {
  @Input() public contract!: ITabModel;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('contractEdit') public editContractTemplate!: TemplateRef<unknown>;
  public tabsComponent!: TabsComponent;

  public constructor(private workflowTabService: WorkflowTabService) {}

  public ngAfterViewInit() {
    this.workflowTabService.tabsComponent$.subscribe((tabsC) => {
      if (tabsC) {
        this.tabsComponent = tabsC;
      }
    });
    this.loadContract(this.contract);
  }
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public loadContract(contract: ITabModel) {
    this.tabsComponent.openTab(`N° ${contract.code || ''}`, this.editContractTemplate, contract, true);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public openOtherTab(event: any) {
    this.loadContract(event);
  }

  public onCloseTab() {
    // close the tab
    this.tabsComponent.closeActiveTab();
  }
}
