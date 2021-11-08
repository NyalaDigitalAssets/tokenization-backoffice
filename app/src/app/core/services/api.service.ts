import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private loadingService: LoadingService
    ) {}

    get<TResponse>(
        url: string,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (showLoading) {
            this.loadingService.startLoading();
        }

        if (handleErrorGlobally) {
            return this.http
                .get(url)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http.get(url).pipe(this.successHandler<TResponse>(showLoading));
    }

    delete<TResponse>(
        url: string,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (showLoading) {
            this.loadingService.startLoading();
        }

        if (handleErrorGlobally) {
            return this.http
                .delete(url)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http.delete(url).pipe(this.successHandler<TResponse>(showLoading));
    }

    post<TPost, TResponse>(
        url: string,
        toPost: TPost,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (showLoading) {
            this.loadingService.startLoading();
        }

        if (handleErrorGlobally) {
            return this.http
                .post(url, toPost)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http.post(url, toPost).pipe(this.successHandler<TResponse>(showLoading));
    }

    put<TPost, TResponse>(
        url: string,
        toPost: TPost,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (showLoading) {
            this.loadingService.startLoading();
        }

        if (handleErrorGlobally) {
            return this.http
                .put(url, toPost)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http.put(url, toPost).pipe(this.successHandler<TResponse>(showLoading));
    }

    patch<TPost, TResponse>(
        url: string,
        toPost: TPost,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (showLoading) {
            this.loadingService.startLoading();
        }

        if (handleErrorGlobally) {
            return this.http
                .patch(url, toPost)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http.patch(url, toPost).pipe(this.successHandler<TResponse>(showLoading));
    }

    private successHandler<TResponse>(showLoading: boolean): OperatorFunction<TResponse, any> {
        return map<TResponse, any>((resp) => {
            if (showLoading) {
                this.loadingService.stopLoading();
            }
            return resp;
        });
    }

    private errorHandler<TResponse>(showLoading: boolean): OperatorFunction<TResponse, any> {
        return catchError<TResponse, any>((errorResponse) => {
            let errorMessage = '';
            let errors = null;
            if (errorResponse && errorResponse.error && errorResponse.error.errorMessageCodes) {
                errorResponse.error.errorMessageCodes.map((m) => (errorMessage += m + '\r\n'));
            } else if (
                errorResponse &&
                errorResponse.statusText &&
                errorResponse.error &&
                errorResponse.error.status
            ) {
                errorMessage = errorResponse.statusText;
                if (errorResponse.error.title) {
                    errorMessage += ' - ' + errorResponse.error.title;
                }
                if (errorResponse.error.errors) {
                    errors = errorResponse.error.errors;
                }
            } else {
                errorMessage = 'Server error.';
                if (errorResponse.status && errorResponse.statusText) {
                    errorMessage = errorResponse.statusText + ' (' + errorResponse.status + ')';
                }
                if (errorResponse.error) {
                    errors = errorResponse.error;
                }
            }

            if (errors) {
                console.error(errorMessage, 'Error details: ', errors);
            } else {
                console.error(errorMessage);
            }

            if (showLoading) {
                this.loadingService.stopLoading();
            }

            this.snackBar.open(errorMessage, 'OK', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                politeness: 'polite',
            });

            return null;
        });
    }
}
