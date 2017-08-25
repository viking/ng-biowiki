import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { WebService } from '../web.service';
import { Web } from '../web';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {
  webName: string;
  webs: Web[];

  constructor(
    private webService: WebService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.
      subscribe((params: ParamMap) => {
        this.webName = params.get('webName');
      });

    this.webService.getWebs().
      subscribe(webs => this.webs = webs);
  }
}
