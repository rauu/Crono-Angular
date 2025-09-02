import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/api/tasks.service';
import { TaskGetResponse } from '../../services/api/models/task-get-response.model';
import { TaskPostRequest } from '../../services/api/models/task-post-request.model';
import { TaskPutRequest } from '../../services/api/models/task-put-request.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEdit: boolean = false;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      customer: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEdit = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string): void {
    this.tasksService.getTask(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          name: task.name,
          description: task.description,
          customer: task.customer
        });
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading task', err)
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      if (this.isEdit && this.taskId) {
        const request = new TaskPutRequest(formValue);
        this.tasksService.updateTask(this.taskId, request).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (err) => console.error('Error updating task', err)
        });
      } else {
        const request = new TaskPostRequest(formValue);
        this.tasksService.createTask(request).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (err) => console.error('Error creating task', err)
        });
      }
    }
  }
}
