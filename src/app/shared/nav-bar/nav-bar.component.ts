import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { UserInfo } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  user: UserInfo | undefined;

  badgeHidden: boolean = true;

  productsBadgeAmount: number = 0;

  amountSubscribeRef!: Subscription;

  constructor(
    private loginService: LoginService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {

    this.user = this.loginService.getUserToken();

    this.prepareBadge(this.cartService.getProductsAmount());

    this.cartService.amountObservable.subscribe(amount => {
      this.prepareBadge(amount);
    })
  }

  prepareBadge(amount: number) {

    this.productsBadgeAmount = amount;

    this.badgeHidden = !(this.productsBadgeAmount > 0);
  }

  ngOnDestroy(): void {
      this.amountSubscribeRef.unsubscribe();
  }

  logOut() {
    this.loginService.logOut();
    window.location.reload();
  }
}
