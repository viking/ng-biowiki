import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { WebService, PageResult, PageResultType } from '../web.service';
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
    private webService: WebService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.
      switchMap((params: ParamMap) => {
        this.webName = params.get('webName');
        this.pageName = params.get('pageName');
        return this.webService.getPage(this.webName, this.pageName);
      }).
      subscribe(result => {
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
