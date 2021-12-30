import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserComment } from 'src/app/model/user-comment';
import { CommentProviderService } from 'src/app/services/comment-provider.service';

@Component({
  selector: 'app-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrls: ['./comment-body.component.scss']
})
export class CommentBodyComponent implements OnInit {

  notifications$: BehaviorSubject<any> = new BehaviorSubject([]);
  public comments$: BehaviorSubject<UserComment[]> = new BehaviorSubject<any>(null);
  public newComments$: BehaviorSubject<UserComment[]> = new BehaviorSubject<any>([]);
  constructor(private commentProviderService: CommentProviderService) {   }

  ngOnInit() {
    this.fetchComments();
    this.commentProviderService.onFetchComments().subscribe(res=>{
      console.log(res);
    })
  }

  saveComment(commentObj: any) {
    commentObj.created = moment(new Date());
    this.commentProviderService.createComment(commentObj).subscribe(res => {
      this.commentProviderService.fetchComment(res.id).subscribe(comment=>{
        let updatedNewComments = [...this.newComments$.value, comment];
        this.newComments$.next(updatedNewComments);
      });
    });
  }

  mergeComments(emittedComments: any) {
    this.comments$.next([...this.comments$.value, ...emittedComments])
    this.newComments$.next([]);
  }
  fetchComments() {
    return this.commentProviderService.fetchComments();
  }

}
