import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginService } from './features/auth/services/login.service';
import { LoadingBarService } from './shared/services/loading-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(
    private loadingBarService: LoadingBarService,
    private loginService: LoginService
  ) {

    this.loading$ = this.loadingBarService.loading$.pipe(
      delay(0)
    );
  }

  ngOnInit(): void {

      if (this.loginService.isTokenExpired()) {

        this.loginService.deleteToken();

        window.location.reload();
      }
  }

}
