import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login.component';
import { LoginGuard } from './auth/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoSnackBarService } from './info-snack-bar.service';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AboutComponent } from './about/about.component';
import { ShareService } from './share.service';
import { I18nService } from './i18n.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'files', pathMatch: 'full'},
  {path: 'files', loadChildren: './files/files.module#FilesModule', canActivateChild: [LoginGuard], canLoad: [LoginGuard]},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    AuthModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    InfoSnackBarService,
    ShareService,
    I18nService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
