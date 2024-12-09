import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as uiState from '../../../shared/state-management/ui-state/ui.actions';
import { AppState } from '../../../app.reducer';
import { AuthService } from '../../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars for component
   * ------------------------------------------------------------------------------------------------------------------------------
  */

  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  isLoading: boolean = false;
  formGroup: FormGroup;

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
  */

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _store: Store<AppState>,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._store.select('ui').pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.isLoading = response.isLoading;
    });
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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

    this._store.dispatch(uiState.isLoading());

    const { email, password } = this.formGroup.value;
    this._authService.logIn(email, password).then(
      (response: any) => {
        this._router.navigate(['/']);
      }
    ).catch((err: any) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong!",
      });
    });
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
  */
}

