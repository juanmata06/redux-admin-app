import { createAction, props } from '@ngrx/store';
import { iBalance } from '../../../interfaces/balance.interface';

export const setItems = createAction('[Balances] Set Items',
  props<{ items: iBalance[] }>()
);

export const unItems = createAction('[Balances] Unset Items',);