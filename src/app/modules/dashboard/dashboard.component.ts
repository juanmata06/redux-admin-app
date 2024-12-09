import { Component, OnDestroy, OnInit } from '@angular/core';

import { ReplaySubject, filter, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducer';

import { BalancesService } from '../../services/balances.service';
import * as actions from '../../shared/state-management/balances-state/balances.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars for component
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */

  constructor(
    private _store: Store<AppState>,
    private _balancesService: BalancesService
  ) { }

  ngOnInit(): void {
    this._store.select('auth').pipe(
      filter(auth => auth.currentUser != null),
      takeUntil(this._unsubscribeAll)
    ).subscribe(({ currentUser }) => {
      this._balancesService.initBalancesListener(currentUser?.uid!).pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe(response => {
        this._store.dispatch(actions.setItems({ items: response }));
      });
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

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
}

