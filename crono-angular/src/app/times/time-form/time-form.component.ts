import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../../services/api/time.service';
import { TimeGetResponse } from '../../services/api/models/time-get-response.model';
import { TimePostRequest } from '../../services/api/models/time-post-request.model';
import { TimePutRequest } from '../../services/api/models/time-put-request.model';

@Component({
  selector: 'app-time-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.css']
})
export class TimeFormComponent implements OnInit {
  timeForm: FormGroup;
  isEdit: boolean = false;
  timeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.timeForm = this.fb.group({
      description: ['', Validators.required],
      begin_date: ['', Validators.required],
      end_date: ['']
    });
  }

  ngOnInit(): void {
    this.timeId = this.route.snapshot.paramMap.get('id');
    if (this.timeId) {
      this.isEdit = true;
      this.loadTime(this.timeId);
    }
  }

  loadTime(id: string): void {
    this.timeService.getTime(id).subscribe({
      next: (time) => {
        this.timeForm.patchValue({
          description: time.description,
          begin_date: time.begin_date,
          end_date: time.end_date
        });
      },
      error: (err) => console.error('Error loading time', err)
    });
  }

  onSubmit(): void {
    if (this.timeForm.valid) {
      const formValue = this.timeForm.value;
      if (this.isEdit && this.timeId) {
        const request = new TimePutRequest(formValue);
        this.timeService.updateTime(this.timeId, request).subscribe({
          next: () => this.router.navigate(['/times']),
          error: (err) => console.error('Error updating time', err)
        });
      } else {
        const request = new TimePostRequest(formValue);
        this.timeService.createTime(request).subscribe({
          next: () => this.router.navigate(['/times']),
          error: (err) => console.error('Error creating time', err)
        });
      }
    }
  }
}
