import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MoviesModule } from './features/movies/movies.module';
import { CartModule } from './features/cart/cart.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './features/auth/auth.module';
import { AuthInterceptorService } from './interceptors/auth.interceptor.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingBarInterceptorService } from './interceptors/loading-bar.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MoviesModule,
    CartModule,
    AuthModule,
    MaterialModule,
    StoreModule.forRoot({},{}),
    StoreDevtoolsModule.instrument({maxAge: 25})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingBarInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
