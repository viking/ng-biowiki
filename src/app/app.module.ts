import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { WebService } from './web.service';

import { AppRoutingModule } from './app-routing.module';
import { PageComponent } from './page/page.component';
import { MarkdownPipe } from './markdown.pipe';
import { PageFormComponent } from './page-form/page-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    MarkdownPipe,
    PageFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
