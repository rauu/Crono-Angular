import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { BackendConfig } from "../../models/backend-config.model";
import { TaskDeleteResponse } from "./models/task-delete-response.model";
import { TaskGetResponse } from "./models/task-get-response.model";
import { TaskPostRequest } from "./models/task-post-request.model";
import { TaskPostResponse } from "./models/task-post-response.model";
import { TaskPutRequest } from "./models/task-put-request.model";
import { TimeDeleteResponse } from "./models/time-delete-response.model";
import { TimeGetResponse } from "./models/time-get-response.model";
import { TimePostRequest } from "./models/time-post-request.model";
import { TimePostResponse } from "./models/time-post-response.model";

@Injectable({ providedIn: 'root' })
export class TasksService {

  private headers: HttpHeaders;

  constructor(
    protected http: HttpClient,
    @Inject('environment.backend') protected backend: BackendConfig
  ) {
      this.headers = new HttpHeaders({
      'x-access-token': this.backend.accessToken,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-access-token'
    });
  }

  getAllTasks(): Observable<TaskGetResponse[]> {
    return this.http.get<TaskGetResponse[]>(`${this.backend.apiUrl}tasks`, { headers: this.headers })
      .pipe(map(data => data.map(item => new TaskGetResponse(item))));
  }

  createTask(request: TaskPostRequest): Observable<TaskPostResponse> {
    return this.http.post<TaskPostResponse>(`${this.backend.apiUrl}tasks`, request, { headers: this.headers })
      .pipe(map(data => new TaskPostResponse(data)));
  }

  updateTask(id: string, request: TaskPutRequest): Observable<TaskPostResponse> {
    return this.http.put<TaskPostResponse>(`${this.backend.apiUrl}tasks/${id}`, request, { headers: this.headers })
      .pipe(map(data => new TaskPostResponse(data)));
  }

  deleteTask(id: string): Observable<TaskDeleteResponse> {
    return this.http.delete<TaskDeleteResponse>(`${this.backend.apiUrl}tasks/${id}`, { headers: this.headers })
      .pipe(map(data => new TaskDeleteResponse(data)));
  }


  getTaskTimes(id: string): Observable<TimeGetResponse[]> {
    return this.http.get<TimeGetResponse[]>(`${this.backend.apiUrl}tasks/${id}/times`, { headers: this.headers })
      .pipe(map(data => data.map(item => new TimeGetResponse(item))));
  }

  createTaskTimes(id: string, request: TimePostRequest): Observable<TimePostResponse> {
    return this.http.post<TimePostResponse>(`${this.backend.apiUrl}tasks/${id}/times`, request, { headers: this.headers })
      .pipe(map(data => new TimePostResponse(data)));
  }

  deleteTaskTimes(taskId: string, timeId: string): Observable<TimeDeleteResponse> {
    return this.http.delete<TimeDeleteResponse>(`${this.backend.apiUrl}tasks/${taskId}/times/${timeId}`, { headers: this.headers })
      .pipe(map(data => new TimeDeleteResponse(data)));
  }

  updateTaskTimes(taskId: string, timeId: string, request: TimePostRequest): Observable<TimePostResponse> {
    return this.http.put<TimePostResponse>(`${this.backend.apiUrl}tasks/${taskId}/times/${timeId}`, request, { headers: this.headers })
      .pipe(map(data => new TimePostResponse(data)));
  }
}
