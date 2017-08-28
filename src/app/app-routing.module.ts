import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebComponent } from './web/web.component';
import { PageComponent } from './page/page.component';
import { PageFormComponent } from './page-form/page-form.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AttachmentFormComponent } from './attachment-form/attachment-form.component';
import { PageVersionsComponent } from './page-versions/page-versions.component';
import { PageVersionComponent } from './page-version/page-version.component';

const routes: Routes = [
  { path: '', redirectTo: '/wiki/Main/WebHome', pathMatch: 'full' },
  {
    path: 'wiki/:webName',
    component: WebComponent,
    children: [
      { path: ':pageName', component: PageComponent },
      { path: ':pageName/edit', component: PageFormComponent },
      { path: ':pageName/attachments', component: AttachmentsComponent },
      { path: ':pageName/attachments/new', component: AttachmentFormComponent },
      { path: ':pageName/versions', component: PageVersionsComponent },
      { path: ':pageName/versions/:versionHash', component: PageVersionComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
