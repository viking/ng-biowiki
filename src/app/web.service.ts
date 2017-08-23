import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../environments/environment';
import { Web } from './web';
import { Page } from './page';

export enum PageResultType {
  OK,
  NotFound,
  Error
}

export class PageResult {
  constructor(public type: PageResultType, public page?: Page) {}
}

@Injectable()
export class WebService {
  private websUrl = `${environment.apiUrl}/webs`;

  constructor(private http: Http) { }

  getWebs(): Observable<Web[]> {
    return this.http.get(this.websUrl).
      map(response => response.json() as Web[]);
  }

  getPages(webName: String): Observable<Page[]> {
    let url = `${this.websUrl}/${webName}`;
    return this.http.get(url).
      map(response => response.json() as Page[]);
  }

  getPage(webName: String, pageName: String): Observable<PageResult> {
    let url = `${this.websUrl}/${webName}/${pageName}`;
    return this.http.get(url).
      map(response => {
        let page = response.json() as Page;
        return new PageResult(PageResultType.OK, page);
      }).
      catch(response => {
        if (response.status == 404) {
          let result = new PageResult(PageResultType.NotFound);
          return Observable.of(result);
        } else {
          throw new Error('bad response');
        }
      });
  }
}
