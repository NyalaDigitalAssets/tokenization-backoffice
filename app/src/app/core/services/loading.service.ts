import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading: boolean = false;
  loadingStatus: Subject<boolean> = new Subject();

  get loading(): boolean {
    return this.isLoading;
  }

  set loading(value) {
    this.isLoading = value;
  }

  startLoading() {
    this.loadingStatus.next(true);
  }

  stopLoading() {
    this.loadingStatus.next(false);
  }
}
