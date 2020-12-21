import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../_services/account.service";
import {Router} from "@angular/router";
import {ContactService} from "../../_services/contact.service";
import {phoneNumberValidator} from "../../validators/phone-validator";

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  @Output() cancelAdd = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  @Output() cancelList = new EventEmitter();

  contactAddForm: FormGroup;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.contactService.deleteCurrentContact();
  }
  intitializeForm() {
    this.contactAddForm = this.fb.group({
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

  get mobileNumber() {
    return this.contactAddForm.get('mobileNumber');
  }

  cancel(){
    this.cancelAdd.emit(false);
    this.cancelEdit.emit(false);
    this.cancelList.emit(false);
  }


  contactAdd() {
    this.contactService.contactAdd(this.contactAddForm.value).subscribe(response => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/contacts']);
      });
      this.cancel();
    }, error => {
      console.log(error.error);
    })
  }
}
