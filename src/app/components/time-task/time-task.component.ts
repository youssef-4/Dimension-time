import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-task',
  templateUrl: './time-task.component.html',
  styleUrls: ['./time-task.component.css']
})
export class TimeTaskComponent implements OnInit {
  nowDate = ' ';
  startDate: any;
  myInterval: any;
  nameTask = '';
  constructor() {}

  stopTimmer(): void {
      clearInterval(this.myInterval);
      this.startDate = ' ';
      this.nowDate = ' ';
      this.nameTask = '';
  }

  startTimmer(event: any): void{
    this.startDate = new Date();
    this.startDate = moment(this.startDate).format('dddd, MMMM Do YYYY, h:mm:ss a');
    this.myInterval = setInterval(() => {
      this.nowDate = moment(this.startDate, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow();
      moment.utc(moment(this.nowDate, 'dddd, MMMM Do YYYY, h:mm:ss a')
      .diff(moment(this.startDate, 'dddd, MMMM Do YYYY, h:mm:ss a'))).format('dd:hh:mm:ss');
    }, 1000);
  }

  ngOnInit(): void {}

}
