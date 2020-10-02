import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { PersonaControllerService } from '../Backend';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cedula: string;
  constructor(private af: AngularFireAuth, private perSrv: PersonaControllerService) { }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.af.signOut();
  }

  hasUser() {
    return this.af.authState;
  }

  userRol() {
   return this.af.currentUser;
  }
}
