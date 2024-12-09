import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, filter, takeUntil } from 'rxjs';
import { AppState } from '../../../app.reducer';
import { iBalance } from '../../../interfaces/balance.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit, OnDestroy {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars for component
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  balances: iBalance[];
  incomes: number = 0;
  expenses: number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */

  constructor(
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this._store.select('balances').pipe(
      filter(balances => balances.items.length > 0),
      takeUntil(this._unsubscribeAll)
    ).subscribe(({ items }) => {
      this.balances = items;
      this.generateStatistics();      
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

  private generateStatistics(): void {
    this.balances.forEach((item: iBalance) => {
      switch (item.type) {
        case 'income':
          this.totalIncomes += item.amount || 0;
          this.incomes++;
          break;
        case 'expense':
          this.totalExpenses += item.amount || 0;
          this.expenses++;
          break;
        default:
          break;
      }
    });

  }

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