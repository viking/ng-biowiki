import { Component, OnInit } from '@angular/core';

import { WebService } from './web.service';
import { Web } from './web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  webs: Web[] = [];
  error: string;

  constructor(private webService: WebService) {}

  ngOnInit(): void {
    this.webService.getWebs().
      subscribe(webs => this.webs = webs);
  }
}
