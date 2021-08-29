import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let displayLoadingScreen = true;

    if (!request.url.startsWith('/api')) {
      displayLoadingScreen = false;
    }

    if (displayLoadingScreen) {
      this.loadingService.startLoading();

      return next
        .handle(request)
        .pipe(delay(1000))
        .pipe(
          finalize(() => {
            this.loadingService.stopLoading();
          })
        );
    } else {
      return next.handle(request);
    }
  }
}
