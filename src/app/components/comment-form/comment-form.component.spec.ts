import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit comment', () => {
    component.commentForm.setValue({name:"test-name", message: "test-comment"});
    expect(component.commentForm.get("name")).toBeTruthy();

    component.onSubmitComment()
    expect(component.commentForm.touched).toBeFalsy();
  });
});
