import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReplaySubject, takeUntil } from 'rxjs';

import { Store } from '@ngrx/store';
import { iBalance } from '../../interfaces/balance.interface';

import { AppState } from '../../app.reducer';
import * as actions from '../../shared/ui-state/ui.actions';

import Swal from 'sweetalert2';

import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.scss'
})
export class BalancesComponent implements OnInit {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars for component
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  formGroup: FormGroup;
  balanceType: string = 'income'; // income or expense
  isLoading: boolean = false;

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _invoicesService: InvoicesService
  ) { }

  ngOnInit(): void {
    this._store.select('ui').pipe(takeUntil(this._unsubscribeAll)).subscribe(({ isLoading }) => {
      this.isLoading = isLoading;
    });
    this.formGroup = this._formBuilder.group({
      amount: ['', [Validators.required]],
      description: ['', Validators.required],
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

  public submitFormGroup(): void {
    if (this.formGroup.invalid) { return; }

    this._store.dispatch(actions.isLoading());
    const balance: iBalance = { ...this.formGroup.value, type: this.balanceType }

    this._invoicesService.createBalance(balance)
      .then(() => {
        this.formGroup.reset();
        this._store.dispatch(actions.stopLoading());
        Swal.fire('Balance created', '', 'success');
      })
      .catch(err => {
        this._store.dispatch(actions.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
}

