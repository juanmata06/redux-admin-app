import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router: Router,
    private _angularFireAuth: AngularFireAuth
  ) { }

  public initAuthListener(): any {
    this._angularFireAuth.authState.subscribe((user: any) => {
      console.log(user.uid, user.email);

    });
  }

  public createUser(name: string, email: string, password: string): any {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public logIn(email: string, password: string): any {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  public logOut(): any {
    return this._angularFireAuth.signOut();
  }

  public isAuth(): Observable<boolean> {
    return this._angularFireAuth.authState.pipe(
      map((user: any) => user != null)
    )
  }
}
