import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { CartState } from 'src/app/features/cart/store/cart-store.model';
import { amountSelector, cartSelector } from 'src/app/features/cart/store/cart.selectors';
import { UserInfo } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  user: UserInfo | undefined;

  badgeHidden: boolean = true;

  productsBadgeAmount$!: Observable<number>;

  amountSubscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private store: Store<CartState>
  ) { }

  ngOnInit(): void {

    this.user = this.loginService.getUserToken();

    this.productsBadgeAmount$ = this.store.pipe(
      select(amountSelector)
    )

    this.amountSubscription = this.productsBadgeAmount$.subscribe(
      amount => {
        this.badgeHidden = (amount > 0) ? false: true;
      }
    )
  }

  logOut() {
    this.loginService.logOut();
    window.location.reload();
  }

  isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  ngOnDestroy(): void {
    this.amountSubscription.unsubscribe();
  }
}
