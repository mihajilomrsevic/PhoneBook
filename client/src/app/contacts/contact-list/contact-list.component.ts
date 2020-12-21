import {Component, Input, OnInit, Output} from '@angular/core';
import { map } from 'rxjs/operators';
import {Drzava} from "../../_models/drzava";
import {AccountService} from "../../_services/account.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ContactService} from "../../_services/contact.service";
import {User} from "../../_models/user";
import {Contact} from "../../_models/contact";
import {Observable} from "rxjs";
import {Member} from "../../_models/member";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactListMode = false;
  contactAddMode = false;
  contactEditMode = false;
  member$: Member;

  contactEdit :Contact;

  @Output() user: User;

  constructor(private accountService: AccountService, private userService: UserService, private contactService: ContactService) {
  }

  addContactToggle(){
    this.contactService.deleteCurrentUserSelect('add');
    this.contactAddMode = !this.contactAddMode;
    this.contactListMode = !this.contactListMode;
  }
  editContactToggle(model: Contact){
    this.contactService.setCurrentContact(model, 'edit');
    this.contactAddMode = false;
    this.contactEditMode = !this.contactEditMode;
    this.contactListMode = true;
    this.contactEdit = model;
  }

  cancelAddMode(event: boolean){
    this.contactAddMode = event;
  }
  cancelEditMode(event: boolean){
    this.contactEditMode = event;
  }
  cancelListMode(event: boolean){
    this.contactListMode = event;
  }


  ngOnInit(): void {
    this.userService.getUser().subscribe(
      member => {
        this.member$ = member;
      });
  }

  deleteContact(id: number) {
    return this.contactService.deleteContact(id).subscribe(() => {
      this.member$.contacts = this.member$.contacts.filter(x => x.id !== id);
    });
  }
}
