import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  public loading$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }
}
