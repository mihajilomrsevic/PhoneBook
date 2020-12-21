import {Component, OnInit, forwardRef, Input, Output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {map, take} from "rxjs/operators";
import {CountriesService} from "../_services/countries.service";
import {Drzava} from "../_models/drzava";
import {Contact} from "../_models/contact";
import {ContactService} from "../_services/contact.service";

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomDropdownComponent),
    multi: true,
  }]
})
export class CustomDropdownComponent implements OnInit, ControlValueAccessor {

  options: Drzava[];
  selectedOption: string;
  currentContact: Contact;

  drzave(){
    this.countriesService.neka().pipe(
      map(response => {
        this.options = response;
      })
    ).subscribe();
  }
  onChange: (_: any) => {};

  constructor(private countriesService: CountriesService, private contactService: ContactService) {
    this.selectedOption = 'Calling code';
  }

  ngOnInit() {
    this.drzave();
    //this.selectedOption = this.contactService.readContactProperties().callingCode;
    this.selectedOption = 'Calling code';
    this.currentContact = null;

    if (this.contactService.status == 'edit' && this.contactService.currentContact$ != null) {
      this.contactService.currentContact$.pipe(take(1)).subscribe(contact => this.currentContact = contact);
    }


    if ((this.contactService.status == 'add' && this.contactService.currentContact$ != null) || (this.contactService.status == 'register' && this.contactService.currentContact$ != null))
    this.selectedOption = 'Calling code';
      else
      this.contactService.currentContact$.pipe(take(1)).subscribe(contact => this.currentContact = contact);
        this.selectedOption = 'Calling code';
      if ((this.contactService.status == 'add' && this.contactService.currentContact$ == null) || (this.contactService.status == 'register' && this.contactService.currentContact$ == null))
        this.selectedOption = 'Calling code';
    }



  writeValue(value: string) {
    this.selectedOption = value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
    if (this.currentContact != null) {
      this.selectedOption = this.currentContact.callingCode;
    } else {
      this.selectedOption = 'Calling code';
    }
  }

  changeSelectedOption(option: string) {
    this.selectedOption = option;
    this.onChange(option);
  }

  registerOnTouched() {

  }


}
