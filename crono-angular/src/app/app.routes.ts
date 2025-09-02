import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tasks/task-list/task-list.component').then(m => m.TaskListComponent)
  },
  {
    path: 'tasks/new',
    loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
  },
  {
    path: 'tasks/:id/times',
    loadComponent: () => import('./times/time-list/time-list.component').then(m => m.TimeListComponent)
  },
  {
    path: 'tasks/:id/times/new',
    loadComponent: () => import('./times/time-form/time-form.component').then(m => m.TimeFormComponent)
  },
  {
    path: 'tasks/:id/times/:timeId',
    loadComponent: () => import('./times/time-form/time-form.component').then(m => m.TimeFormComponent)
  }
];
