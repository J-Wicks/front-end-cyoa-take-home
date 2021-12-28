import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  inputs: ['comment']
})
export class CommentCardComponent implements OnInit {

  @Input()
  public message: string = "";
  @Input()
  public name: string = "";
  @Input()
  public created: string = "";

  expand: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleHeightLimit() {
    this.expand = !this.expand;
  }

}
