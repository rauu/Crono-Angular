import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimeService } from '../../services/api/time.service';
import { TimeGetResponse } from '../../services/api/models/time-get-response.model';

@Component({
  selector: 'app-time-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {
  times: TimeGetResponse[] = [];
  filteredTimes: TimeGetResponse[] = [];
  searchTerm: string = '';

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    this.loadTimes();
  }

  loadTimes(): void {
    this.timeService.getAllTimes().subscribe({
      next: (data) => {
        this.times = data;
        this.filteredTimes = data;
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

  deleteTime(id: string): void {
    if (confirm('¿Estás seguro de eliminar este tiempo?')) {
      this.timeService.deleteTime(id).subscribe({
        next: () => this.loadTimes(),
        error: (err) => console.error('Error deleting time', err)
      });
    }
  }
}
