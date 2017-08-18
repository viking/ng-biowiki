import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

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
    AppRoutingModule,
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
