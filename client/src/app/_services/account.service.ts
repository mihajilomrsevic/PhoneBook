import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ReplaySubject} from "rxjs";
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user: any;
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(public http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        console.log(JSON.stringify(user));
        if (user){

          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + "account/register", model).pipe(
      map((user: User) => {
        if (user){
           //localStorage.setItem('user', JSON.stringify(user));
           //this.currentUserSource.next(user);
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }



}
