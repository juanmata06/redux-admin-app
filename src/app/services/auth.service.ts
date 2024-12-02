import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { iUser } from '../interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router: Router,
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore
  ) { }

  public initAuthListener(): void {
    this._angularFireAuth.authState.subscribe((user: any) => {
      console.log(user.uid, user.email);

    });
  }

  public createUser(name: string, email: string, password: string): Promise<void> {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password).then(({ user }) => {

      const newUser: iUser = {
        uid: user?.uid,
        name: name,
        email: user?.email || undefined,
      };

      return this._angularFirestore.doc(`${user?.uid}/user`).set(newUser);
    });
  }

  public logIn(email: string, password: string): Promise<any> {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  public logOut(): Promise<void> {
    return this._angularFireAuth.signOut();
  }

  public isAuth(): Observable<boolean> {
    return this._angularFireAuth.authState.pipe(
      map((user: any) => user != null)
    )
  }
}
