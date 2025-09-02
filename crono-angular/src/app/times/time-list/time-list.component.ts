import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimeGetResponse } from '../../services/api/models/time-get-response.model';
import { TasksService } from '../../services/api/tasks.service';
import { SelectedTimeService } from '../../services/selected-time.service';

@Component({
  selector: 'app-time-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeListComponent implements OnInit {
  times: TimeGetResponse[] = [];
  filteredTimes: TimeGetResponse[] = [];
  searchTerm: string = '';
  taskId?: string;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private selectedTimeService: SelectedTimeService
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.loadTimes();
  }

  loadTimes(): void {
    if (!this.taskId) return;
    this.tasksService.getTaskTimes(this.taskId).subscribe({
      next: (data) => {
        this.times = data;
        this.filteredTimes = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading times', err)
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredTimes = this.times.filter(time =>
        time.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTimes = this.times;
    }
  }

  editTime(time: TimeGetResponse): void {
    this.selectedTimeService.setSelectedTime(time);
    this.router.navigate([time.id], { relativeTo: this.route });
  }

  deleteTime(id: string): void {
    if (!this.taskId) return;
    if (confirm('¿Estás seguro de eliminar este tiempo?')) {
      this.tasksService.deleteTaskTimes(this.taskId, id).subscribe({
        next: () => this.loadTimes(),
        error: (err) => console.error('Error deleting time', err)
      });
    }
  }
}
