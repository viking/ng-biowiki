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
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  webName: string;
  pageName: string;
  page: Page;
  notFound: boolean;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
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
        return this.pageService.getPage(this.webName, this.pageName);
      }
      return Observable.empty();
    }).subscribe(result => {
      switch (result.type) {
        case PageResultType.OK:
          this.setPage(result.page);
          break;
        case PageResultType.NotFound:
          this.handleNotFound();
          break;
      }
    });
  }

  private setPage(page: Page): void {
    this.page = page;
    this.notFound = false;
  }

  private handleNotFound(): void {
    this.page = undefined;
    this.notFound = true;
  }
}
