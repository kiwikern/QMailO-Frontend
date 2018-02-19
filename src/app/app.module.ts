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
import { FilesModule } from './files/files.module';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'files', pathMatch: 'full'},
  {path: 'files', loadChildren: () => FilesModule, canActivate: [LoginGuard]}
];

@NgModule({
  declarations: [
    AppComponent
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
    FilesModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
