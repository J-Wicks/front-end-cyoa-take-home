import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input()
  public comments: any;

  @Input()
  newComments: any;
  @Output()
  clickShowComments: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {

  }

  mergeComments(event: any){
    this.clickShowComments.emit(event);
  }
}
