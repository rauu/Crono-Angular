import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimePostRequest } from '../../services/api/models/time-post-request.model';
import { TimePutRequest } from '../../services/api/models/time-put-request.model';
import { TasksService } from '../../services/api/tasks.service';
import { SelectedTimeService } from '../../services/selected-time.service';

@Component({
  selector: 'app-time-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeFormComponent implements OnInit, OnDestroy {
  timeForm: FormGroup;
  isEdit: boolean = false;
  timeId: string | null = null;
  taskId?: string;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private selectedTimeService: SelectedTimeService
  ) {
    this.timeForm = this.fb.group({
      description: ['', Validators.required],
      begin_date: ['', Validators.required],
      end_date: ['']
    });
    this.taskId = this.route.snapshot.paramMap.get('id') ?? undefined;
  }

  ngOnInit(): void {
    this.timeId = this.route.snapshot.paramMap.get('timeId');
    if (this.timeId) {
      this.isEdit = true;
      this.selectedTimeService.getSelectedTime().subscribe(time => {
        if (time && time.begin_date) {
          this.timeForm.patchValue({
            description: time.description || '',
            begin_date: this.formatDateForInput(time.begin_date),
            end_date: time.end_date ? this.formatDateForInput(time.end_date) : ''
          });
          this.cdr.markForCheck();
        } else {
          this.router.navigate(['/tasks', this.taskId, 'times']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.selectedTimeService.clearSelectedTime();
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  onSubmit(): void {
    if (this.timeForm.valid) {
      const formValue = this.timeForm.value;
      if (this.isEdit && this.timeId) {
        const request = new TimePutRequest(formValue);
        this.tasksService.updateTaskTimes(this.taskId!, this.timeId, request).subscribe({
          next: () => this.router.navigate(['/tasks', this.taskId, 'times']),
          error: (err) => console.error('Error updating time', err)
        });
      } else {
        const request = new TimePostRequest(formValue);
        this.tasksService.createTaskTimes(this.taskId!, request).subscribe({
          next: () => this.router.navigate(['/tasks', this.taskId, 'times']),
          error: (err) => console.error('Error creating time', err)
        });
      }
    }
  }
}
