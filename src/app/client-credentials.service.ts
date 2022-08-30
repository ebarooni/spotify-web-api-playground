import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {spotifyApiKeys} from "./api-secrets/spotify-api-keys";
import {catchError, Observable, Subject, throwError} from "rxjs";

export interface AuthRequestPayload {
  url: string,
  headers: HttpHeaders,
  body: HttpParams
}

export interface SpotifyAuthResponse {
  access_token: string,
  expires_in: number,
  token_type: string
}

@Injectable()
export class ClientCredentialsService {
  private readonly errorHandlerSubject = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) { }

  get errorHandlerSubject$(): Observable<HttpErrorResponse> {
    return this.errorHandlerSubject.asObservable();
  }

  private get authRequestPayload(): AuthRequestPayload {
    const buffer = `${spotifyApiKeys.CLIENT_ID}:${spotifyApiKeys.CLIENT_SECRET}`;
    let bodyParams = new HttpParams();
    bodyParams = bodyParams.set('grant_type', 'client_credentials');

    return {
      url: 'https://accounts.spotify.com/api/token',
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + (btoa(buffer)),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: bodyParams
    };
  }

  sendAuthRequest(): Observable<SpotifyAuthResponse> {
    return this.http.post<SpotifyAuthResponse>(
      this.authRequestPayload.url,
      this.authRequestPayload.body,
      {headers: this.authRequestPayload.headers}
    ).pipe(
      catchError((err) => this.errorHandler(err))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorHandlerSubject.next(error);
    return throwError(() => new Error(error.message));
  }
}
