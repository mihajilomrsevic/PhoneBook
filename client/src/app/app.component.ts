import { Component } from '@angular/core';
import {User} from "./_models/user";
import {AccountService} from "./_services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private accountService: AccountService) {
  }
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    // iscitava iz localstorage trenutnog korisnika
    const user: User = JSON.parse(localStorage.getItem('user'));
    // smesta trenutnog korisnika u bafer
    this.accountService.setCurrentUser(user);
  }
}
