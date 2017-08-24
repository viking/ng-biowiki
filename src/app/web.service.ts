import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { Web } from './web';

@Injectable()
export class WebService {
  private websUrl = `${environment.apiUrl}/webs`;

  constructor(private http: Http) { }

  getWebs(): Observable<Web[]> {
    return this.http.get(this.websUrl).
      map(response => response.json() as Web[]);
  }
}
