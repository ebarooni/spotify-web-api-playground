import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, Subject, throwError} from "rxjs";
import {AccessTokenProps} from "./access-token.repository";

@Injectable()
export class ClientCredentialsFlowService {
  private readonly errorHandlerSubject = new Subject<HttpErrorResponse>();
  private readonly URL = 'https://accounts.spotify.com/api/token';
  private readonly BODY_PARAMS = new HttpParams({fromObject: {grant_type: 'client_credentials'}});

  constructor(
    private readonly http: HttpClient
  ) { }

  get errorHandlerSubject$(): Observable<HttpErrorResponse> {
    return this.errorHandlerSubject.asObservable();
  }

  private generateHttpHeaders(clientId: string, clientSecret: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + (btoa(`${clientId}:${clientSecret}`)),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  sendAuthRequest(clientId: string, clientSecret: string): Observable<AccessTokenProps> {
    return this.http.post<AccessTokenProps>(
      this.URL,
      this.BODY_PARAMS,
      {headers: this.generateHttpHeaders(clientId, clientSecret)}
    ).pipe(
      catchError((err) => this.errorHandler(err)),
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorHandlerSubject.next(error);
    return throwError(() => new Error(error.message));
  }
}
