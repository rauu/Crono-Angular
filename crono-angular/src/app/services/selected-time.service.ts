import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeGetResponse } from './api/models/time-get-response.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedTimeService {
  private selectedTime = new BehaviorSubject<TimeGetResponse | null>(null);

  setSelectedTime(time: TimeGetResponse | null): void {
    this.selectedTime.next(time);
  }

  getSelectedTime(): Observable<TimeGetResponse | null> {
    return this.selectedTime.asObservable();
  }

  clearSelectedTime(): void {
    this.selectedTime.next(null);
  }
}
