import {Contact} from "./contact";
import {Photo} from "./Photo";

export interface User{
  id: number;
  username: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  city: string;
  country: string;
  token: string;
  photos: Photo[];
  contacts: Contact[];
}
