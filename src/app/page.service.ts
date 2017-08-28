import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../environments/environment';
import { Page, PageVersion } from './page';

export enum PageResultType {
  OK,
  NotFound,
  Error
}

export class PageResult {
  constructor(public type: PageResultType, public page?: Page) {}
}

@Injectable()
export class PageService {
  private websUrl = `${environment.apiUrl}/webs`;

  constructor(private http: Http) { }

  getPages(webName: string): Observable<Page[]> {
    let url = `${this.websUrl}/${webName}/pages`;
    return this.http.get(url).
      map(response => response.json() as Page[]);
  }

  getPage(webName: string, pageName: string): Observable<PageResult> {
    let url = `${this.websUrl}/${webName}/pages/${pageName}`;
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

  createPage(webName: string, page: Page): Observable<any> {
    let url = `${this.websUrl}/${webName}/pages`;
    return this.http.post(url, JSON.stringify(page));
  }

  updatePage(webName: string, page: Page): Observable<any> {
    let url = `${this.websUrl}/${webName}/pages/${page.name}`;
    return this.http.put(url, JSON.stringify(page));
  }

  getPageVersions(webName: string, pageName: string): Observable<PageVersion[]> {
    let url = `${this.websUrl}/${webName}/pages/${pageName}/versions`;
    return this.http.get(url).
      map(response => response.json() as PageVersion[]);
  }

  getPageVersion(webName: string, pageName: string, versionHash: string): Observable<PageResult> {
    let url = `${this.websUrl}/${webName}/pages/${pageName}/versions/${versionHash}`;
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
