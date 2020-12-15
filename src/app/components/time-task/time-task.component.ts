import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-task',
  templateUrl: './time-task.component.html',
  styleUrls: ['./time-task.component.css']
})
export class TimeTaskComponent implements OnInit {
  nowDate = ' ';
  startDate: any = '';
  myInterval: any = '';
  nameTask = '';
  myLastTask = {
    nameTask: '',
    startTask : '',
    timeTask : ''
  };

  showTask = false;
  showBtnStart = true;
  showBtnStop = false;

  constructor() {}

  stopTimmer(): void {
      // Stop interval
      clearInterval(this.myInterval);
      // Set new values for the task
      this.myLastTask.nameTask = this.nameTask;
      this.myLastTask.startTask = this.startDate;
      this.myLastTask.timeTask = this.nowDate;
      // Reset task
      this.startDate = '';
      this.nowDate = '';
      this.nameTask = '';

      this.showBtnStart = !this.showBtnStart;
      this.showBtnStop = !this.showBtnStop;
      this.showTask = true;
      // true = false
  }

  startTimmer(): void{
    // Visible Last Task
    this.showBtnStart = !this.showBtnStart;
    this.showBtnStop = !this.showBtnStop;
    // Start Date
    this.startDate = moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a');
    // Now VS Start Date
    this.myInterval = setInterval(() => {
      this.nowDate = moment(this.startDate, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow();
      moment.utc(moment(this.nowDate, 'dddd, MMMM Do YYYY, h:mm:ss a')
      .diff(moment(this.startDate, 'dddd, MMMM Do YYYY, h:mm:ss a'))).format('dd:hh:mm:ss');
    }, 100);
  }

  ngOnInit(): void {}

}
