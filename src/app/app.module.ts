import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { PageService } from './page.service';
import { AttachmentService } from './attachment.service';

import { AppRoutingModule } from './app-routing.module';
import { PageComponent } from './page/page.component';
import { MarkdownPipe } from './markdown.pipe';
import { PageFormComponent } from './page-form/page-form.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AttachmentFormComponent } from './attachment-form/attachment-form.component';
import { WebComponent } from './web/web.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    MarkdownPipe,
    PageFormComponent,
    AttachmentsComponent,
    AttachmentFormComponent,
    WebComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    WebService,
    PageService,
    AttachmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
