import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { iBalance } from '../../../interfaces/balance.interface';

import { AppState } from '../../../app.reducer';
import { ReplaySubject, filter, takeUntil } from 'rxjs';
import { BalancesService } from '../../../services/balances.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars for component
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  balances: iBalance[];

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
    this._store.select('balances').pipe(
      filter(balances => balances.items.length > 0),
      takeUntil(this._unsubscribeAll)
    ).subscribe(({ items }) => {
      this.balances = items;
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

  public deleteBalance(uid?: string): void {
    if (!uid) { return; }

    this._balancesService.deleteBalanceByUid(uid)
      .then(() => {
        Swal.fire('Balance deleted', '', 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'err.message', 'error');
      });
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
}

