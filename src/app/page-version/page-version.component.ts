import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';

import { PageService, PageResult, PageResultType } from '../page.service';
import { Page } from '../page';

@Component({
  selector: 'app-page-version',
  templateUrl: './page-version.component.html',
  styleUrls: ['./page-version.component.css']
})
export class PageVersionComponent implements OnInit {
  webName: string;
  pageName: string;
  versionHash: string;
  page: Page;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    Observable.merge(
      this.route.parent.parent.paramMap,
      this.route.parent.paramMap,
      this.route.paramMap
    ).switchMap((params: ParamMap) => {
      if (params.has('webName')) {
        // web changed
        this.webName = params.get('webName');
      } else if (params.has('pageName')) {
        // page changed
        this.pageName = params.get('pageName');
        this.versionHash = params.get('versionHash');
      }

      if (this.webName && this.pageName && this.versionHash) {
        return this.pageService.getPageVersion(this.webName, this.pageName, this.versionHash);
      }
      return Observable.empty();
    }).subscribe((result: PageResult) => {
      switch (result.type) {
        case PageResultType.OK:
          this.page = result.page;
          break;
      }
    });
  }
}
