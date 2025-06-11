import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { WorkflowContainer } from './workflow.container';
import { hasPermission } from '../authentication/guard/has-permission.guard';
import { authGuard } from '../authentication/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkflowContainer,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'maintain/virtual-assistant',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/virtual-assistant-maintenance/virtual-assistant-maintenance.module').then(
            (m) => m.VirtualAssistantMaintenanceModule,
          ),
      },
      {
        path: 'maintain/client',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/client-maintenance/client-maintenance.module').then((m) => m.ClientMaintenanceModule),
      },
      {
        path: 'maintain/field',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./maintenance/views/field-maintenance/field-maintenance.module').then((m) => m.FieldMaintenanceModule),
      },
      {
        path: 'maintain/campus',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/campus-maintenance/campus-maintenance.module').then((m) => m.CampusMaintenanceModule),
      },
      {
        path: 'maintain/role',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./maintenance/views/role-maintenance/role-maintenance.module').then((m) => m.RoleMaintenanceModule),
      },
      {
        path: 'maintain/user',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./maintenance/views/user-maintenance/user-maintenance.module').then((m) => m.UserMaintenanceModule),
      },
      {
        path: 'maintain/group',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./maintenance/views/group-maintenance/group-maintenance.module').then((m) => m.GroupMaintenanceModule),
      },
      {
        path: 'maintain/template',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/template-maintenance/template-maintenance.module').then((m) => m.TemplateMaintenanceModule),
      },
      {
        path: 'maintain/penalty',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/penalty-maintenance/penalty-maintenance.module').then((m) => m.PenaltyMaintenanceModule),
      },
      {
        path: 'maintain/document-type',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/document-type-maintenance/document-type-maintenance.module').then(
            (m) => m.DocumentTypeMaintenanceModule,
          ),
      },
      {
        path: 'maintain/user-rep',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/user-rep-maintenance/user-rep-maintenance.module').then((m) => m.UserRepMaintenanceModule),
      },
      {
        path: 'maintain/profile',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/profile-maintenance/profile-maintenance.module').then((m) => m.ProfileMaintenanceModule),
      },
      {
        path: 'maintain/alert',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./maintenance/views/alert-maintenance/alert-maintenance.module').then((m) => m.AlertMaintenanceModule),
      },
      {
        path: 'maintain/alert-type',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/alert-type-maintenance/alert-type-maintenance.module').then((m) => m.AlertTypeMaintenanceModule),
      },
      {
        path: 'maintain/area',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./maintenance/views/area-maintenance/area-maintenance.module').then((m) => m.AreaMaintenanceModule),
      },
      {
        path: 'maintain/notification-type',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          // eslint-disable-next-line max-len
          import('./maintenance/views/notification-type-maintenance/notification-type-maintenance.module').then(
            (m) => m.NotificationTypeMaintenanceModule,
          ),
      },
      {
        path: 'maintain/holiday',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/holiday-maintenance/holiday-maintenance.module').then((m) => m.HolidayMaintenanceModule),
      },
      {
        path: 'maintain/workflow',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/workflow-maintenance/workflow-maintenance.module').then((m) => m.WorkflowMaintenanceModule),
      },
      {
        path: 'maintain/replacement',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/replacement-maintenance/replacement-maintenance.module').then((m) => m.ReplacementMaintenanceModule),
      },
      {
        path: 'maintain/process',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/process-maintenance/process-maintenance.module').then((m) => m.ProcessMaintenanceModule),
      },
      {
        path: 'maintain/button',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/button-maintenance/button-maintenance.module').then((m) => m.ButtonMaintenanceModule),
      },
      {
        path: 'maintain/numeration',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/numeration-maintenance/numeration-maintenance.module').then((m) => m.NumerationMaintenanceModule),
      },
      {
        path: 'maintain/purchase-transaction',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./maintenance/views/purchase-transaction/purchase-transaction.module').then((m) => m.PurchaseTransactionModule),
      },
      {
        path: 'final-user/register-request',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./final-user/views/register-request/register-request.module').then((m) => m.RegisterRequestModule),
      },
      {
        path: 'final-user/inbox',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./final-user/views/inbox/inbox.module').then((m) => m.InboxModule),
      },
      {
        path: 'final-user/contract-detail-external',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./final-user/views/contract-detail-external/contract-detail-external.module').then((m) => m.ContratDetailExternalModule),
      },
      {
        path: 'final-user/pending',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./final-user/views/pending/pending.module').then((m) => m.PendingModule),
      },
      {
        path: 'final-user/requests',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./final-user/views/requests/requests.module').then((m) => m.RequestsModule),
      },
      {
        path: 'final-user/requests-to-send',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./final-user/views/requests-to-send/requests-to-send.module').then((m) => m.RequestsToSendModule),
      },
      {
        path: 'final-user/register-manual-contract',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./final-user/views/register-manual-contract/register-manual-contract.module').then((m) => m.RegisterManualContractModule),
      },
      {
        path: 'final-user/register-manual-addendum',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./final-user/views/register-manual-addendum/register-manual-addendum.module').then((m) => m.RegisterManualAddendumModule),
      },
      {
        path: 'final-user/search-documents',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./final-user/views/search-documents/search-documents.module').then((m) => m.SearchDocumentsModule),
      },
      {
        path: 'final-user/request-tracking',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./final-user/views/request-tracking/request-tracking.module').then((m) => m.RequestTrackingModule),
      },
      {
        path: 'reports/documents-area',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/documents-area/documents-area.module').then((m) => m.DocumentsAreaModule),
      },
      {
        path: 'reports/files-area',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/files-area/files-area.module').then((m) => m.FilesAreaModule),
      },
      {
        path: 'reports/pending-tray-status',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/pending-tray-status/pending-tray-status.module').then((m) => m.PendingTrayStatusModule),
      },
      {
        path: 'reports/contracts-alarms',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/contracts-alarms/contracts-alarms.module').then((m) => m.ContractsAlarmsModule),
      },
      {
        path: 'reports/monitoring-open-processes',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./reports/views/monitoring-open-processes/monitoring-open-processes.module').then((m) => m.MonitoringOpenProcessesModule),
      },
      {
        path: 'reports/status-reports',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/status-report/status-report.module').then((m) => m.StatusReportModule),
      },
      {
        path: 'reports/indicators',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/indicators/indicators.module').then((m) => m.IndicatorsModule),
      },
      {
        path: 'reports/contract-situation',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/contract-situation/contract-situation.module').then((m) => m.ContractSituationModule),
      },
      {
        path: 'reports/service-report',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/service-report/service-report.module').then((m) => m.ServiceReportModule),
      },
      {
        path: 'reports/lease-report',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/lease-report/lease-report.module').then((m) => m.LeaseReportModule),
      },
      {
        path: 'reports/electronic-signature-tracking',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./reports/views/electronic-signature-tracking/electronic-signature-tracking.module').then(
            (m) => m.ElectronicSignatureTrackingModule,
          ),
      },
      {
        path: 'reports/requests-electronic-signature',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./reports/views/requests-electronic-signature/requests-electronic-signature.module').then(
            (m) => m.RequestsElectronicSignatureModule,
          ),
      },
      {
        path: 'reports/user-groups-report',
        canActivate: [authGuard, hasPermission],
        loadChildren: () => import('./reports/views/user-groups-report/user-groups-report.module').then((m) => m.UserGroupsReportModule),
      },
      {
        path: 'reports/management-indicators',
        canActivate: [authGuard, hasPermission],
        loadChildren: () =>
          import('./reports/views/management-indicators/management-indicators.module').then((m) => m.ManagementIndicatorsModule),
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'speed' },
  { path: '**', pathMatch: 'full', redirectTo: 'speed' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
