import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { WebService } from './web.service';

import { AppRoutingModule } from './app-routing.module';
import { PageComponent } from './page/page.component';
import { MarkdownPipe } from './markdown.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    MarkdownPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
