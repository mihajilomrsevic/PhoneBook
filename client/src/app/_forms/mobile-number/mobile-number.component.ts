import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";
import {Drzava} from "../../_models/drzava";
import {Router} from "@angular/router";
import {CountriesService} from "../../_services/countries.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.css']
})
export class MobileNumberComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text';

  constructor(public countriesService: CountriesService) {
  }


  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  ngOnInit(): void {
  }

}
