import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingBarService } from '../shared/services/loading-bar.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarInterceptorService implements HttpInterceptor {

  constructor(private loadingBarService: LoadingBarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loadingBarService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingBarService.hide();
      }));
  }
}
