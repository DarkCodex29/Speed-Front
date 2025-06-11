import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VirtualAssistantComponent } from './virtual-assistant.component';
import { ListQuestionsComponent } from '../list-questions/list-questions.component';
import { RegisterQuestionAssistantComponent } from '../register-question-assistant/register-question-assistant.component';
import { StatusDocumentComponent } from '../status-document/status-document.component';

@NgModule({
	declarations: [VirtualAssistantComponent],
	imports: [CommonModule, RouterModule, ListQuestionsComponent, RegisterQuestionAssistantComponent, StatusDocumentComponent],
	exports: [VirtualAssistantComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VirtualAssistantModule {}
