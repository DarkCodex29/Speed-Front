# Speed Front - Sistema de Gestión Documental y Workflow

![Angular](https://img.shields.io/badge/Angular-16.2.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)
![PrimeNG](https://img.shields.io/badge/PrimeNG-16.3.1-blue)
![License](https://img.shields.io/badge/License-Private-yellow)

**Speed Front** es una aplicación web empresarial desarrollada en Angular 16 que funciona como un sistema integral de gestión documental y automatización de workflows para contratos y documentos legales.

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación y Configuración](#instalación-y-configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Módulos Principales](#módulos-principales)
- [Configuración de Entorno](#configuración-de-entorno)
- [Funcionalidades](#funcionalidades)
- [Arquitectura](#arquitectura)
- [Contribución](#contribución)

## Características Principales

- **Gestión Documental Avanzada** - Upload, versionado y control de documentos
- **Workflows Automatizados** - Flujos de aprobación configurables
- **Firma Electrónica** - Integración con sistemas de firma digital
- **Dashboards Ejecutivos** - Métricas y KPIs en tiempo real
- **Sistema de Permisos** - Control granular de acceso por roles
- **Reportería Integrada** - Reportes SSRS empresariales
- **Asistente Virtual** - IA integrada para soporte al usuario
- **UI/UX Moderna** - Interfaz responsive con PrimeNG

## Tecnologías Utilizadas

### Core Framework

- **Angular 16.2.0** - Framework principal
- **TypeScript 5.0.2** - Lenguaje de programación
- **RxJS 7.8.0** - Programación reactiva
- **SCSS** - Preprocesador de estilos

### Bibliotecas UI

- **PrimeNG 16.3.1** - Componentes de interfaz
- **PrimeIcons 6.0.1** - Iconografía
- **Quill 1.3.7** - Editor de texto enriquecido
- **ECharts 5.4.3** - Gráficos y visualizaciones

### Herramientas de Desarrollo

- **Angular CLI 16.2.0** - Herramientas de desarrollo
- **ESLint** - Linting de código
- **Prettier 3.0.0** - Formateo de código
- **Husky** - Git hooks
- **Karma/Jasmine** - Testing

### Utilidades

- **PDF.js 3.6.172** - Visualización de PDFs
- **ExcelJS 4.3.0** - Generación de archivos Excel
- **Moment.js 2.29.4** - Manipulación de fechas
- **File-Saver 2.0.5** - Descarga de archivos

### Web Components Personalizados

- **HDC-WC Library** - Librería de componentes atómicos personalizados
  - `hdc-input` - Input personalizado
  - `hdc-select` - Select avanzado
  - `hdc-multiselect` - Multiselección
  - `hdc-autocomplete` - Autocompletado

## Requisitos del Sistema

- **Node.js** 18.x o superior
- **npm** 9.x o superior
- **Angular CLI** 16.x
- **Navegador** moderno con soporte ES2022

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd speed-front-feature-merge-project
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar entorno

```bash
# Copiar y configurar variables de entorno
cp src/app/environments/environment.example.ts src/app/environments/environment.ts
```

### 4. Ejecutar la aplicación

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Scripts Disponibles

| Script                   | Descripción                                     |
| ------------------------ | ----------------------------------------------- |
| `npm start`              | Inicia el servidor de desarrollo en puerto 4200 |
| `npm run build`          | Construye la aplicación para producción         |
| `npm run watch`          | Construye en modo watch para desarrollo         |
| `npm test`               | Ejecuta las pruebas unitarias                   |
| `npm run lint`           | Ejecuta ESLint para análisis de código          |
| `npm run lint:fix`       | Corrige automáticamente problemas de linting    |
| `npm run prettier:fix`   | Aplica formateo de código con Prettier          |
| `npm run prettier:check` | Verifica el formateo del código                 |
| `npm run version`        | Muestra la versión actual del proyecto          |
| `grunt`                  | Genera archivo WAR para despliegue              |

## Estructura del Proyecto

```
src/
├── app/
│   ├── authentication/          # Módulo de autenticación
│   │   ├── guard/              # Guards de protección
│   │   ├── interceptor/        # Interceptores HTTP
│   │   ├── login/              # Componentes de login
│   │   └── services/           # Servicios de autenticación
│   ├── common/                 # Componentes y servicios compartidos
│   │   ├── components/         # Componentes reutilizables
│   │   ├── modals/            # Modales de la aplicación
│   │   ├── services/          # Servicios comunes
│   │   └── interfaces/        # Interfaces TypeScript
│   ├── workflow/              # Módulo principal de trabajo
│   │   ├── dashboard/         # Dashboards y métricas
│   │   ├── final-user/        # Funcionalidades de usuario final
│   │   ├── maintenance/       # Módulos de mantenimiento
│   │   └── reports/           # Sistema de reportes
│   └── environments/          # Configuración de entornos
├── assets/                    # Recursos estáticos
│   ├── css/                  # Estilos CSS
│   ├── img/                  # Imágenes
│   ├── js/                   # Bibliotecas JavaScript
│   └── scss/                 # Archivos SCSS
└── favicon.ico
```

## Módulos Principales

### Authentication

- Sistema de login interno y externo
- Gestión de tokens JWT
- Guards de autenticación y permisos
- Interceptores para APIs

### Dashboard

- Dashboard ejecutivo multi-rol
- Métricas de gestión en tiempo real
- Gráficos interactivos
- Indicadores de rendimiento

### Final User

- **Inbox** - Bandeja de entrada de solicitudes
- **Register Request** - Registro de nuevas solicitudes
- **Contracts** - Gestión de contratos y adendas
- **Document Search** - Búsqueda avanzada de documentos
- **Tracking** - Seguimiento de solicitudes

### Maintenance

- Gestión de usuarios, roles y perfiles
- Configuración de workflows
- Mantenimiento de plantillas
- Configuración de alertas
- Gestión de tipos de documentos

### Reports

- Reportes de indicadores de gestión
- Estados de solicitudes
- Seguimiento de firmas electrónicas
- Reportes por área y usuario
- Monitoreo de procesos

## Configuración de Entorno

### Variables de Entorno (environment.ts)

```typescript
export const environment = {
  apiUrl: 'http://localhost:9096/services',
  reporteIndicadores: '[URL_REPORTE_SSRS]',
  reporteEstadosSolicitud: '[URL_REPORTE_SSRS]',
  // ... otras configuraciones de reportes
};
```

### Configuración de Backend

- **API URL**: Configurable por entorno (desarrollo: `localhost:9096/services`)
- **Autenticación**: JWT Token based
- **Reportes**: Integración con SSRS (SQL Server Reporting Services)
- **File Upload**: Soporte para múltiples formatos
- **Despliegue**: Generación de archivos WAR para servidores Java

## Funcionalidades

### Gestión Documental

- Upload y gestión de archivos
- Versionado de documentos
- Firma electrónica integrada
- Plantillas automáticas
- Historial de cambios
- Visualizador de PDFs

### Workflow de Aprobación

- Flujos configurables
- Sistema de visado
- Notificaciones automáticas
- Escalamiento de tareas
- Trazabilidad completa

### Características Empresariales

- Multi-tenant
- Roles y permisos granulares
- Integración con Active Directory
- API RESTful
- Cache optimizado

## Arquitectura

### Patrones de Diseño

- **Modular Architecture** - Separación por funcionalidades
- **Lazy Loading** - Carga bajo demanda de módulos
- **Reactive Programming** - RxJS para manejo de estado
- **Component-Based** - Arquitectura basada en componentes

### Características Técnicas

- **Guards** - Protección de rutas
- **Interceptors** - Manejo centralizado de HTTP
- **Services** - Lógica de negocio reutilizable
- **Shared Components** - Componentes reutilizables
- **Custom Elements** - Web Components personalizados

## Contribución

### Estándares de Código

- Seguir las reglas de ESLint configuradas
- Usar Prettier para formateo consistente
- Escribir pruebas para nuevas funcionalidades
- Documentar cambios en el código

### Proceso de Desarrollo

1. Crear rama feature desde develop
2. Implementar cambios siguiendo estándares
3. Ejecutar tests y linting
4. Crear Pull Request con descripción detallada
5. Revisión de código por el equipo

### Git Hooks

- **Pre-commit**: Ejecuta linting automático
- **Lint-staged**: Verifica archivos modificados

## Licencia

Este proyecto es propietario y confidencial. Todos los derechos reservados.

---

## Soporte

Para soporte técnico o consultas sobre el proyecto, contactar al equipo de desarrollo.

**Desarrollado con ❤️ por el equipo Speed Front**
