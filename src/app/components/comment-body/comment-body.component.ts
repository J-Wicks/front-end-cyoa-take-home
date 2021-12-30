import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserComment } from 'src/app/model/user-comment';
import { CommentProviderService } from 'src/app/services/comment-provider.service';

@Component({
  selector: 'app-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrls: ['./comment-body.component.scss']
})
export class CommentBodyComponent implements OnInit {

  notifications$: BehaviorSubject<any> = new BehaviorSubject([]);
  public comments$: BehaviorSubject<UserComment[]> = new BehaviorSubject<any>([]);
  public newComments$: BehaviorSubject<UserComment[]> = new BehaviorSubject<any>([]);
  constructor(private commentProviderService: CommentProviderService) {   }
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(this.fetchComments().subscribe(res=>{
      this.comments$.next(res);
    }));

    this.subscriptions.push(this.commentProviderService.onCommentEmitted().subscribe(res=>{
      if(this.comments$.value.length){
        this.newComments$.next(this.commentDifferences(res, this.comments$.value));
      } else {
        this.comments$.next(res);
      }
    }));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=> {
      sub.unsubscribe();
    });
  }
  commentDifferences(newArr: any[], sourceArr:any[]){
    var sourceIds:any = {};

    sourceArr.forEach(function(obj: any){
      sourceIds[obj.id] = obj;
    });

    // Return all elements in A, unless in B
    return newArr.filter(function(obj){
      return !(obj.id in sourceIds);
    });
  }

  saveComment(commentObj: any) {
    commentObj.created = moment(new Date());
    this.commentProviderService.createComment(commentObj).subscribe(res => {
      console.log("Comment Created Successfully");
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
