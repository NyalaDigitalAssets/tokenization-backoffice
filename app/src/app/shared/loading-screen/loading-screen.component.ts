import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements AfterViewInit, OnDestroy {  
  loadingSubscription: Subscription;

  constructor(
    private loadingService: LoadingService,
    private elmRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.elmRef.nativeElement.style.display = 'false';
    this.loadingSubscription = this.loadingService.loadingStatus
      .pipe(debounceTime(200))
      .subscribe((status: boolean) => {      
        this.elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
