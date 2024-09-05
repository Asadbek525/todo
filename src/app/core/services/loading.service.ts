import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new Subject<number>();
  loading$ = this.loadingSubject.asObservable();
  private loadingCount = 0;
  show() {
    this.loadingCount++;
    this.loadingSubject.next(this.loadingCount);
  }

  hide() {
    this.loadingCount--;
    this.loadingSubject.next(this.loadingCount);
  }

  reset() {
    this.loadingCount = 0;
    this.loadingSubject.next(this.loadingCount);
  }
}
