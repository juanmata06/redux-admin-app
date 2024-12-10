import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReplaySubject, filter, takeUntil } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { iUser } from '../../interfaces/user.interface';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  currentUserData: iUser;

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */

  constructor(
    private _router: Router,
    private _store: Store<AppState>,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._store.select('auth').pipe(
      filter(auth => auth.currentUser != null),
      takeUntil(this._unsubscribeAll)
    ).subscribe(({ currentUser }) => {
      this.currentUserData = currentUser!;
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  public logOut(): void {
    this._authService.logOut().then(() => {
      this._router.navigate(['/login']);
    });
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
}