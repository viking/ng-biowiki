import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

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
  page = { name: '' } as Page;
  isNew: boolean;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.
      switchMap((params: ParamMap) => {
        this.webName = params.get('webName');
        this.pageName = params.get('pageName');
        return this.pageService.getPage(this.webName, this.pageName);
      }).
      subscribe(result => {
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
