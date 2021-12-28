import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommentBannerComponent } from './new-comment-banner.component';

describe('NewCommentBannerComponent', () => {
  let component: NewCommentBannerComponent;
  let fixture: ComponentFixture<NewCommentBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCommentBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommentBannerComponent);
    component = fixture.componentInstance;
    component.newComments = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
