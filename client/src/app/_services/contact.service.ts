import { Injectable } from '@angular/core';
import {Drzava} from "../_models/drzava";
import {map, take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../_models/user";
import {AccountService} from "./account.service";
import {LocalUser} from "../_models/localUser";
import {environment} from "../../environments/environment";
import {Contact} from "../_models/contact";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private currentContactSource = new ReplaySubject<Contact>(1);
  currentContact$ = this.currentContactSource.asObservable();
  status: string;

  contact: Contact;
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private accountService: AccountService) { }

  setCurrentContact(contact: Contact, status: string){
    this.status = status;
    localStorage.setItem('contact', JSON.stringify(contact));
    this.currentContactSource.next(contact);
  }
  deleteCurrentUserSelect(status: string){
    this.status = status;
  }

  deleteCurrentContact(){
    localStorage.removeItem('contact');
  }

  saveContactProperties(contact: Contact){
    this.contact = contact;
  }

  readContactProperties(){
    return this.contact;
  }

  contacts() {
    return this.http.post<any>(this.baseUrl+ 'contact/get-contacts',{}).pipe(
      map(user => {
        console.log(JSON.stringify(user));
      })
    );
  }
  contactAdd(model: any){
    return this.http.post<any>(this.baseUrl + 'contact/add-contact', model);
  }
  deleteContact(id: number){
    return this.http.delete(this.baseUrl + 'contact/delete-contact/' + id);
  }

  updateContact(contact: any){
    return this.http.put(this.baseUrl + 'contact/edit-contact', contact);
  }

}
