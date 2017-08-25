import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';

import { PageService, PageResult, PageResultType } from '../page.service';
import { Page } from '../page';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.css']
})
export class PageFormComponent implements OnInit {
  webName: string;
  pageName: string;
  page: Page;
  isNew: boolean;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router,
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
    }).subscribe((result: PageResult) => {
      switch (result.type) {
        case PageResultType.OK:
          this.page = result.page;
          this.isNew = false;
          break;
        case PageResultType.NotFound:
          this.page = { name: this.pageName } as Page;
          this.isNew = true;
          break;
      }
    });
  }

  onSubmit(): void {
    if (this.isNew) {
      this.createPage();
    } else {
      this.updatePage();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private createPage(): void {
    this.pageService.createPage(this.webName, this.page).
      subscribe(result => {
        this.router.navigate(['/wiki', this.webName, this.pageName]);
      });
  }

  private updatePage(): void {
    this.pageService.updatePage(this.webName, this.page).
      subscribe(result => {
        this.router.navigate(['/wiki', this.webName, this.pageName]);
      });
  }
}
