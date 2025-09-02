import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { BackendConfig } from "../../models/backend-config.model";
import { TaskDeleteResponse } from "./models/task-delete-response.model";
import { TaskGetResponse } from "./models/task-get-response.model";
import { TaskPostRequest } from "./models/task-post-request.model";
import { TaskPostResponse } from "./models/task-post-response.model";
import { TaskPutRequest } from "./models/task-put-request.model";

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

  // Task methods
  getAllTasks(): Observable<TaskGetResponse[]> {
    return this.http.get<TaskGetResponse[]>(`${this.backend.apiUrl}tasks`, { headers: this.headers })
      .pipe(map(data => data.map(item => new TaskGetResponse(item))));
  }

  getTask(id: string): Observable<TaskGetResponse> {
    return this.http.get<TaskGetResponse>(`${this.backend.apiUrl}tasks/${id}`, { headers: this.headers })
      .pipe(map(data => new TaskGetResponse(data)));
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
}
