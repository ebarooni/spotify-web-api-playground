import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";

export interface AccessTokenResponse {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string
}

@Injectable()
export class AccessTokenRequestService {
  private readonly URL = 'https://accounts.spotify.com/api/token';

  constructor(
    private readonly http: HttpClient
  ) { }

  private generateRequestBodyParams(
    authCode: string,
    clientId: string,
    codeVerifier: string
  ): HttpParams {
    return new HttpParams({
      fromObject: {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: environment.redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
      }
    });
  }

  private generateHttpHeaders(clientId: string, clientSecret: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + (btoa(`${clientId}:${clientSecret}`)),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  sendAuthRequest(clientId: string, clientSecret: string, authCode: string, codeVerifier: string): Observable<AccessTokenResponse | HttpErrorResponse> {
    return this.http.post<AccessTokenResponse>(
      this.URL,
      this.generateRequestBodyParams(authCode, clientId, codeVerifier),
      {headers: this.generateHttpHeaders(clientId, clientSecret)}
    ).pipe(
      catchError((err) => this.errorHandler(err)),
    )
  }

  private errorHandler(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return of(error);
  }
}
