import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  public canActivate(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap(state => {
        if (!state) {
          this._router.navigate(['/login'])
        }
      })
    );
  }
}