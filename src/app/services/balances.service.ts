import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';

import { iBalance } from '../interfaces/balance.interface';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  constructor(
    private _router: Router,
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore,
    private _store: Store,
    private _authService: AuthService
  ) { }

  public initBalancesListener(uid: string): void {
    this._angularFirestore.collection(`${uid}/balances/items`).valueChanges().
    subscribe(response => {
      console.log(response);
      
    })
  }

  public createBalance(balance: iBalance) {
    const uid = this._authService.user?.uid;
    return this._angularFirestore.doc(`${uid}/balances`)
      .collection('items')
      .add({ ...balance });
  }
}
