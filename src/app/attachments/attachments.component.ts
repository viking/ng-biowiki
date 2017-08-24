import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
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
    this.route.paramMap.
      switchMap((params: ParamMap) => {
        this.webName = params.get('webName');
        this.pageName = params.get('pageName');
        return this.attachmentService.getAttachments(this.webName, this.pageName);
      }).
      subscribe(attachments => this.attachments = attachments);
  }
}
