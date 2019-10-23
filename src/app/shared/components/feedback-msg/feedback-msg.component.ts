import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sm-feedback-msg',
  templateUrl: './feedback-msg.component.html',
  styleUrls: ['./feedback-msg.component.css']
})
export class FeedbackMsgComponent implements OnInit {

  @Input() success = false;

  constructor() { }

  ngOnInit() {
  }


}
