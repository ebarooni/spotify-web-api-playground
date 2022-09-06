import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

export interface AccessTokenResponse {
  access_token: string,
  token_type: string,
  expires_in: number
}

@Injectable()
export class ClientCredentialsService {
  private readonly URL = 'https://accounts.spotify.com/api/token';
  private readonly BODY_PARAMS = new HttpParams({fromObject: {grant_type: 'client_credentials'}});

  constructor(
    private readonly http: HttpClient
  ) { }

  private generateHttpHeaders(clientId: string, clientSecret: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + (btoa(`${clientId}:${clientSecret}`)),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  sendAuthRequest(clientId: string, clientSecret: string): Observable<AccessTokenResponse | HttpErrorResponse> {
    return this.http.post<AccessTokenResponse>(
      this.URL,
      this.BODY_PARAMS,
      {headers: this.generateHttpHeaders(clientId, clientSecret)}
    ).pipe(
      catchError((err) => this.errorHandler(err)),
    )
  }

  private errorHandler(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return of(error);
  }
}
