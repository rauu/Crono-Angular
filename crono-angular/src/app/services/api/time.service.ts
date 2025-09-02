import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { BackendConfig } from "../../models/backend-config.model";
import { TimeDeleteRequest } from "./models/time-delete-request.model";
import { TimeDeleteResponse } from "./models/time-delete-response.model";
import { TimeGetResponse } from "./models/time-get-response.model";
import { TimePostRequest } from "./models/time-post-request.model";
import { TimePostResponse } from "./models/time-post-response.model";
import { TimePutRequest } from "./models/time-put-request.model";
import { TimePutResponse } from "./models/time-put-response.model";

@Injectable({ providedIn: 'root' })
export class TimeService {

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

  getAllTimes(): Observable<TimeGetResponse[]> {
    return this.http.get<TimeGetResponse[]>(`${this.backend.apiUrl}times`, { headers: this.headers })
      .pipe(map(data => data.map(item => new TimeGetResponse(item))));
  }

  getTime(id: string): Observable<TimeGetResponse> {
    return this.http.get<TimeGetResponse>(`${this.backend.apiUrl}times/${id}`, { headers: this.headers })
      .pipe(map(data => new TimeGetResponse(data)));
  }

  createTime(request: TimePostRequest): Observable<TimePostResponse> {
    return this.http.post<TimePostResponse>(`${this.backend.apiUrl}times`, request, { headers: this.headers })
      .pipe(map(data => new TimePostResponse(data)));
  }

  updateTime(id: string, request: TimePutRequest): Observable<TimePutResponse> {
    return this.http.put<TimePutResponse>(`${this.backend.apiUrl}times/${id}`, request, { headers: this.headers })
      .pipe(map(data => new TimePutResponse(data)));
  }

  deleteTime(id: string): Observable<TimeDeleteResponse> {
    return this.http.delete<TimeDeleteResponse>(`${this.backend.apiUrl}times/${id}`, { headers: this.headers })
      .pipe(map(data => new TimeDeleteResponse(data)));
  }
}
