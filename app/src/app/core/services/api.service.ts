import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
    ) { }

    get<TResponse>(url: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<TResponse> {
        if (handleErrorGlobally) {
            return this.http
                .get(url)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http
            .get(url)
            .pipe(
                this.successHandler<TResponse>(showLoading),
            );
    }

    delete<TResponse>(url: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<TResponse> {
        if (handleErrorGlobally) {
            return this.http
                .delete(url)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http
            .delete(url)
            .pipe(
                this.successHandler<TResponse>(showLoading),
            );
    }

    post<TPost, TResponse>(
        url: string,
        toPost: TPost,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (handleErrorGlobally) {
            return this.http
                .post(url, toPost)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http
            .post(url, toPost)
            .pipe(
                this.successHandler<TResponse>(showLoading),
            );
    }

    put<TPost, TResponse>(
        url: string,
        toPost: TPost,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (handleErrorGlobally) {
            return this.http
                .put(url, toPost)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http
            .put(url, toPost)
            .pipe(
                this.successHandler<TResponse>(showLoading),
            );
    }

    patch<TPost, TResponse>(
        url: string,
        toPost: TPost,
        showLoading: boolean = true,
        handleErrorGlobally: boolean = true
    ): Observable<TResponse> {
        if (handleErrorGlobally) {
            return this.http
                .patch(url, toPost)
                .pipe(
                    this.successHandler<TResponse>(showLoading),
                    this.errorHandler<TResponse>(showLoading)
                );
        }

        return this.http
            .patch(url, toPost)
            .pipe(
                this.successHandler<TResponse>(showLoading),
            );
    }

    private successHandler<TResponse>(showLoading: boolean): OperatorFunction<TResponse, any> {
        return map<TResponse, any>((resp) => {
            return resp;
        });
    }

    private errorHandler<TResponse>(showLoading: boolean): OperatorFunction<TResponse, any> {
        return catchError<TResponse, any>((errorResponse) => {
            let errorMessage = '';
            if (errorResponse && errorResponse.error && errorResponse.error.errorMessageCodes) {
                errorResponse.error.errorMessageCodes.map((m) => (errorMessage += m + '\r\n'));
            } else {
                errorMessage = 'Server error.';
            }
            console.error(errorMessage);
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
