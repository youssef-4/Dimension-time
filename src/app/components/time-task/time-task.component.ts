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
  myInterval: any;
  nameTask = '';

  allTask: any = [];

  task = {
    nameTask: '',
    startTask : '',
    timeTask : ''
  };

  showTask = false;
  showBtnStart = true;
  showBtnStop = false;

  constructor() {}

  saveTask(myLastTask: any): void{
    this.allTask.push(myLastTask);
    console.log(this.allTask);
  }

  stopTimmer(): void {
      // Stop interval
      clearInterval(this.myInterval);
      // Set new values for the task
      this.task.nameTask = this.nameTask;
      this.task.startTask = this.startDate;
      this.task.timeTask = this.nowDate;
      // TODO: Save in Firebase
      this.saveTask(JSON.stringify(this.task));
      // Reset task
      this.startDate = '';
      this.nowDate = '';
      this.nameTask = '';

      this.showBtnStart = !this.showBtnStart;
      this.showBtnStop = !this.showBtnStop;
      this.showTask = true;
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
