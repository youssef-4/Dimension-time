import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-task',
  templateUrl: './time-task.component.html',
  styleUrls: ['./time-task.component.css']
})
export class TimeTaskComponent implements OnInit {
  stopCounter = false;
  finishExecution = false;
  nowDate: any;
  startDate: any;
  breaker = false;
  buttonTxt = 'Start';
  constructor() {}

  changesColorBtn(): boolean {
    if (this.breaker === true){
      this.buttonTxt = 'Stop';
      return false;
    } else{
      this.buttonTxt = 'Start';
      this.startDate = null;
      this.nowDate = null;
      return true;
    }
  }

  startTimmer(event: any): void{

    this.breaker = !this.breaker;
    this.startDate = new Date();
    this.startDate = moment(this.startDate).format('dddd, MMMM Do YYYY, h:mm:ss a');
    // this.nowDate = moment(this.startDate, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow();
    setInterval(() => {
      this.nowDate = moment(this.startDate, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow();
      moment.utc(moment(this.nowDate, 'dddd, MMMM Do YYYY, h:mm:ss a')
      .diff(moment(this.startDate, 'dddd, MMMM Do YYYY, h:mm:ss a'))).format('dd:hh:mm:ss');

    }, 1000);

    console.log(this.nowDate);
  }

  stopTimmer(): void{
    this.stopCounter = true;
  }

  ngOnInit(): void {}

}
