import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVersionsComponent } from './page-versions.component';

describe('PageVersionsComponent', () => {
  let component: PageVersionsComponent;
  let fixture: ComponentFixture<PageVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
