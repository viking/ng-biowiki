import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './page/page.component';
import { PageFormComponent } from './page-form/page-form.component';
import { AttachmentsComponent } from './attachments/attachments.component';

const routes: Routes = [
  { path: '', redirectTo: '/wiki/Main/WebHome', pathMatch: 'full' },
  { path: 'wiki/:webName/:pageName', component: PageComponent },
  { path: 'wiki/:webName/:pageName/edit', component: PageFormComponent },
  { path: 'wiki/:webName/:pageName/attachments', component: AttachmentsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
