import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TextDecoder } from 'text-encoding';
import * as base64 from 'base-64';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';

import { environment } from '../environments/environment';
import { Attachment } from './attachment';

export enum AttachmentResultType {
  OK,
  NotFound,
  Error
}

export class AttachmentResult {
  constructor(public type: AttachmentResultType, public attachment?: Attachment) {}
}

@Injectable()
export class AttachmentService {
  private websUrl = `${environment.apiUrl}/webs`;

  constructor(private http: Http) { }

  getAttachments(webName: string, pageName: string): Observable<Attachment[]> {
    let url = `${this.websUrl}/${webName}/${pageName}/attachments`;
    return this.http.get(url).
      map(response => {
        let arr = response.json();
        return arr.map(attribs => this.process(webName, pageName, attribs));
      });
  }

  getAttachment(webName: string, pageName: string, attachmentName: string): Observable<AttachmentResult> {
    let url = `${this.websUrl}/${webName}/${pageName}/attachments/${attachmentName}`;
    return this.http.get(url).
      map(response => {
        let attachment = this.process(webName, pageName, response.json());
        return new AttachmentResult(AttachmentResultType.OK, attachment);
      }).
      catch(response => {
        if (response.status == 404) {
          let result = new AttachmentResult(AttachmentResultType.NotFound);
          return Observable.of(result);
        } else {
          throw new Error('bad response');
        }
      });
  }

  private process(webName: string, pageName: string, attribs: any): Attachment {
    return new Attachment(webName, pageName, attribs.file_name);
  }
}
