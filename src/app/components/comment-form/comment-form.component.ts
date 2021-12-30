import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Output()
  private onCommentSubmit = new EventEmitter<any>();

  commentForm = new FormGroup({
    name: new FormControl(''),
    message: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }
  
  onSubmitComment() {
    this.onCommentSubmit.emit(this.commentForm.value);
    this.commentForm.reset();
  }

}
