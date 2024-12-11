//* Angular:
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//* Firebase:
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

//* NGRX Redux:
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

//* Local languaje configs:
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es-ES', localeEsExtra);

//* APP:
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BalancesComponent } from './modules/balances/balances.component';
import { StatisticsComponent } from './modules/balances/statistics/statistics.component';
import { DetailComponent } from './modules/balances/detail/detail.component';
import { BalancesOrderPipe } from './shared/pipes/balances-order.pipe';

import { AuthModule } from './modules/auth/auth.module';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BalancesComponent,
    StatisticsComponent,
    DetailComponent,
    BalancesOrderPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ReactiveFormsModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({ "projectId": "redux-admin-app-6c55e", "appId": "1:305624092676:web:0d8d96375f3656a8242551", "storageBucket": "redux-admin-app-6c55e.firebasestorage.app", "apiKey": "AIzaSyAZTdkvoJPtrB_ZW8BV--B7RtCCFmWeCJY", "authDomain": "redux-admin-app-6c55e.firebaseapp.com", "messagingSenderId": "305624092676", "measurementId": "G-5S5PFMW9Y7" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
