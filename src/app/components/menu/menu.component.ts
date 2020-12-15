import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  visibleLogOut = 'Logout';
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.visibleLogOut = 'Logout';
  }

  logOut(): any{
    const response = this.authService.onLogout();
    console.log(response);
    this.router.navigate(['/login']);
  }

}
