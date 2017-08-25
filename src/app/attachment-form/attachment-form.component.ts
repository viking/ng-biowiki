import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { AttachmentService } from '../attachment.service';
import { Attachment } from '../attachment';

@Component({
  selector: 'app-attachment-form',
  templateUrl: './attachment-form.component.html',
  styleUrls: ['./attachment-form.component.css']
})
export class AttachmentFormComponent implements OnInit {
  webName: string;
  pageName: string;
  file: any;
  running: boolean;

  @ViewChild('file') fileElement: ElementRef;

  constructor(
    private attachmentService: AttachmentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.webName = params.get('webName');
      this.pageName = params.get('pageName');
    });
  }

  onSubmit(): void {
    this.running = true;
    let file = this.fileElement.nativeElement.files[0];
    let att = new Attachment(this.webName, this.pageName, file.name, file);
    this.attachmentService.createAttachment(att).
      subscribe(response => {
        this.router.navigate(['/wiki', this.webName, this.pageName, 'attachments']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
