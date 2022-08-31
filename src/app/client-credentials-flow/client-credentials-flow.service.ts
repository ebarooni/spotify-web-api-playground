import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import * as moment from "moment";

export interface ClientCredentialsFlowResponse {
  access_token: string,
  expires_in: number,
  token_type: string
}

@Injectable()
export class ClientCredentialsFlowService {
  private readonly errorHandlerSubject = new Subject<HttpErrorResponse>();
  private readonly URL = 'https://accounts.spotify.com/api/token';
  private readonly BODY_PARAMS = new HttpParams({fromObject: {grant_type: 'client_credentials'}});

  constructor(private http: HttpClient) { }

  get errorHandlerSubject$(): Observable<HttpErrorResponse> {
    return this.errorHandlerSubject.asObservable();
  }

  private generateHttpHeaders(clientId: string, clientSecret: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + (btoa(`${clientId}:${clientSecret}`)),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  sendAuthRequest(clientId: string, clientSecret: string): Observable<ClientCredentialsFlowResponse> {
    return this.http.post<ClientCredentialsFlowResponse>(
      this.URL,
      this.BODY_PARAMS,
      {headers: this.generateHttpHeaders(clientId, clientSecret)}
    ).pipe(
      catchError((err) => this.errorHandler(err)),
      tap(response => localStorage.setItem(
        'access_token_info',
        JSON.stringify(
          {
            access_token: response.access_token,
            received_at: moment.now(),
            token_type: response.token_type
          }
        )
      ))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorHandlerSubject.next(error);
    return throwError(() => new Error(error.message));
  }
}
