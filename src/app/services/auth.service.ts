import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router: Router,
    private _angularFireAuth: AngularFireAuth
  ) { }

  public createUser(name: string, email: string, password: string): any {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public logIn(email: string, password: string): any {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  public logOut(): any {
    return this._angularFireAuth.signOut();
  }
}
