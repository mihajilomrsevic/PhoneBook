import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {Member} from "../_models/member";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getUsers() {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>('http://localhost:5000/api/' + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getUser(/*username: string*/) {
    /*const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);*/
    return this.http.get<Member>(this.baseUrl + 'contact/');
  }

  updateUser(member: Member){
    // pipe sluzi kad hocemo nesto da uradimmo sa dovavljenim podacima
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
}
