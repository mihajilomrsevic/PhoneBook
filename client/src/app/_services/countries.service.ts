import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Drzava} from "../_models/drzava";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountriesService{
  niz: Drzava[] = [];

  constructor(public http: HttpClient) {
  }
  neka(){
     return this.http.get<Drzava[]>('https://restcountries.eu/rest/v2/all');
  }
}
