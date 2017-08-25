import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';

import { AttachmentService } from '../attachment.service';
import { Attachment } from '../attachment';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  webName: string;
  pageName: string;
  attachments: Attachment[];

  constructor(
    private attachmentService: AttachmentService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    Observable.merge(
      this.route.parent.paramMap,
      this.route.paramMap
    ).switchMap((params: ParamMap) => {
      if (params.has('webName')) {
        // web changed
        this.webName = params.get('webName');
      } else if (params.has('pageName')) {
        // page changed
        this.pageName = params.get('pageName');
      }

      if (this.webName && this.pageName) {
        return this.attachmentService.getAttachments(this.webName, this.pageName);
      }
      return Observable.empty();
    }).subscribe((attachments: Attachment[]) => this.attachments = attachments);
  }
}
