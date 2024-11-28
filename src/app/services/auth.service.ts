import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _angularFireAuth: AngularFireAuth
  ) { }

  public createUser(name: string, email: string, password: string): any {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public loginUser(email: string, password: string): any {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password);
  }
}
