import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'tasks',
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
    path: 'times',
    loadComponent: () => import('./times/time-list/time-list.component').then(m => m.TimeListComponent)
  },
  {
    path: 'times/new',
    loadComponent: () => import('./times/time-form/time-form.component').then(m => m.TimeFormComponent)
  },
  {
    path: 'times/:id',
    loadComponent: () => import('./times/time-form/time-form.component').then(m => m.TimeFormComponent)
  }
];
