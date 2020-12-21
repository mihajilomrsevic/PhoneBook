import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../../_services/account.service";
import {User} from "../../_models/user";
import {take} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../_models/member";
import {HttpClient} from "@angular/common/http";
import {Contact} from "../../_models/contact";
import {UserService} from "../../_services/user.service";
import {ContactService} from "../../_services/contact.service";
import {Router} from "@angular/router";
import {phoneNumberValidator} from "../../validators/phone-validator";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  user: User;

  @Input() contact: Contact;
  @Output() cancelAdd = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  @Output() cancelList = new EventEmitter();

  member: Member;
  kontakt: Contact;
  contactEditForm: FormGroup;

  constructor(private accountService: AccountService, private http: HttpClient, private userService: UserService, private contactService: ContactService,
              private router:Router, private fb: FormBuilder) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.intitializeForm();
  }
  updateContact(model: any){
    this.contactService.deleteCurrentContact();
    this.contactService.updateContact(model).subscribe(response => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/contacts']);
      });
      this.cancel();
    }, error => {
      console.log(error.error);
    });
  }

  get mobileNumber() {
    return this.contactEditForm.get('mobileNumber');
  }

  cancel(){
    this.contactService.deleteCurrentContact();
    this.contactService.deleteCurrentUserSelect('add');
    this.cancelAdd.emit(false);
    this.cancelEdit.emit(false);
    this.cancelList.emit(false);
  }

  intitializeForm() {
    this.contactEditForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      callingCode:['', Validators.required],
      mobileNumber:['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        phoneNumberValidator
      ]],
    })
  }
}

