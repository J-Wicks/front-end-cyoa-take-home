import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommentProviderService } from 'src/app/services/comment-provider.service';

import { CommentBodyComponent } from './comment-body.component';

describe('CommentBodyComponent', () => {
  let component: CommentBodyComponent;
  let fixture: ComponentFixture<CommentBodyComponent>;
  let mockCommentProviderService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentBodyComponent ],
      providers: [{
        provide: CommentProviderService,
        useValue: jasmine.createSpyObj('CommentProviderService', ['createComment', 'fetchComments','fetchComment'])
     }],
     schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockCommentProviderService = TestBed.get(CommentProviderService);

    mockCommentProviderService.createComment.and.returnValue(of({id:1}));
    mockCommentProviderService.fetchComment.and.returnValue(of({message: "test"}));
    mockCommentProviderService.fetchComments.and.returnValue(of([{name: "default-comment"}]));


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save comment', () => {
    component.saveComment({});
    expect(mockCommentProviderService.createComment).toHaveBeenCalled();
    expect(mockCommentProviderService.fetchComment).toHaveBeenCalledWith(1);
    expect(component.newComments$.value).toEqual([{message: "test"}]);
  });

  it('should merge comment', () => {
    component.mergeComments([{name: "test-comment"}]);
    expect(component.comments$.value.length).toEqual(2);
  });
});
