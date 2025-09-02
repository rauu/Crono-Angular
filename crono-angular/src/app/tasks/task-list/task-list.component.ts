import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/api/tasks.service';
import { TaskGetResponse } from '../../services/api/models/task-get-response.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: TaskGetResponse[] = [];
  filteredTasks: TaskGetResponse[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.tasksService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tasks', err);
        this.errorMessage = 'Error al cargar las tareas. Verifica la conexión al servidor.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredTasks = this.tasks.filter(task =>
        task.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.customer?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  deleteTask(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.tasksService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => {
          console.error('Error deleting task', err);
          alert('Error al eliminar la tarea.');
        }
      });
    }
  }
}
