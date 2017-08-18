import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/toPromise';

import { Web } from './web';
import { Page } from './page';

@Injectable()
export class WebService {
  private websUrl = `${environment.apiUrl}/webs`;

  constructor(private http: Http) { }

  getWebs(): Promise<Web[]> {
    return this.http.get(this.websUrl).toPromise().
      then(response => response.json() as Web[]);
  }

  getPages(webName: String): Promise<Page[]> {
    let url = `${this.websUrl}/${webName}`;
    return this.http.get(url).toPromise().
      then(response => response.json() as Page[]);
  }

  getPage(webName: String, pageName: String): Promise<Page> {
    let url = `${this.websUrl}/${webName}/${pageName}`;
    return this.http.get(url).toPromise().
      then(response => response.json() as Page);
  }
}
