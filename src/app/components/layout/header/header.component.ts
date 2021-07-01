import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged  = false;
  user = new User();
  constructor(private _AuthService : AuthService) { }

  ngOnInit(): void {
    this._AuthService.verifyUserLoged().subscribe( res => { this.isLogged  = res;})
    this.user.username = this._AuthService.getCurrentUser();
    this.user.email = this._AuthService.getCurrentUser();
  }

  logout(){
    this._AuthService.logout();
    this.user = null;
  }

}
