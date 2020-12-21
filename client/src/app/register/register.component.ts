import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CountriesService} from "../_services/countries.service";
import {Drzava} from "../_models/drzava";
import {map} from "rxjs/operators";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {phoneNumberValidator} from "../validators/phone-validator";
import {ContactService} from "../_services/contact.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;

  constructor(private accountService: AccountService,
              private fb: FormBuilder, private router: Router,
              private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.contactService.deleteCurrentContact();
    this.contactService.deleteCurrentUserSelect('register');
  }



  intitializeForm() {
      this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      callingCode: ['', Validators.required],
        mobileNumber:['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          phoneNumberValidator
        ]],
      country: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }


  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatching: true}
    }
  }
  get mobileNumber() {
    return this.registerForm.get('mobileNumber');
  }

  register() {

    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/contacts');
    }, error => {
      console.log(error.error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
