import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskGetResponse } from './api/models/task-get-response.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedTaskService {
  private selectedTask = new BehaviorSubject<TaskGetResponse | null>(null);

  setSelectedTask(task: TaskGetResponse | null): void {
    this.selectedTask.next(task);
  }

  getSelectedTask(): Observable<TaskGetResponse | null> {
    return this.selectedTask.asObservable();
  }

  clearSelectedTask(): void {
    this.selectedTask.next(null);
  }
}
