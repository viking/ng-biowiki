import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';

import { PageService } from '../page.service';
import { PageVersion } from '../page';

@Component({
  selector: 'app-page-versions',
  templateUrl: './page-versions.component.html',
  styleUrls: ['./page-versions.component.css']
})
export class PageVersionsComponent implements OnInit {
  webName: string;
  pageName: string;
  versions: PageVersion[] = [];

  constructor(
    private pageService: PageService,
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
        return this.pageService.getPageVersions(this.webName, this.pageName);
      }
      return Observable.empty();
    }).subscribe((versions: PageVersion[]) => this.versions = versions);
  }
}
