import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TextDecoder } from 'text-encoding';
import * as convert from 'base64-arraybuffer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';

import { environment } from '../environments/environment';
import { Attachment } from './attachment';

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

  createAttachment(att: Attachment): Observable<any> {
    return this.deprocess(att).concatMap(attribs => {
      let url = `${this.websUrl}/${att.webName}/${att.pageName}/attachments`;
      return this.http.post(url, JSON.stringify(attribs));
    });
  }

  private process(webName: string, pageName: string, attribs: any): Attachment {
    return new Attachment(webName, pageName, attribs.file_name);
  }

  private deprocess(att: Attachment): Observable<any> {
    let attribs: any = {};
    attribs.file_name = att.fileName;
    if (att.data) {
      let reader = new FileReader();

      let obs = Observable.fromEvent(reader, 'loadend').
        map((event: any) => {
          attribs.encoded_data = convert.encode(reader.result);
          return attribs;
        });
      reader.readAsArrayBuffer(att.data);
      return obs;
    } else {
      return Observable.of(attribs);
    }
  }
}
