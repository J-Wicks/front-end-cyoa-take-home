import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-comment-banner',
  templateUrl: './new-comment-banner.component.html',
  styleUrls: ['./new-comment-banner.component.scss']
})
export class NewCommentBannerComponent implements OnInit {

  @Input()
  newComments: any;
  @Output()
  clickShowComments: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  
  clickShowNewComments() {
    this.clickShowComments.emit(this.newComments);
  }
}
