import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) { }
  ngOnInit(): void {}

  logOut(): any{
    const response = this.authService.onLogout();
    console.log(response);
  }

}
