import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui-state/ui.reducer';
import * as auth from './modules/auth/auth-state/auth.reducer';

export interface AppState {
  ui: ui.State
  auth: auth.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer
}