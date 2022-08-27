import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {spotifyApiKeys} from "./api-secrets/spotify-api-keys";
import {Observable} from "rxjs";

export interface AuthRequestPayload {
  url: string,
  headers: HttpHeaders,
  body: string,
  json: boolean
}

export interface SpotifyAuthResponse {
  access_token: string,
  expires_in: number,
  token_type: string
}

@Injectable()
export class ClientCredentialsService {

  constructor(private http: HttpClient) { }

  private get authRequestPayload(): AuthRequestPayload {
    const buffer = `${spotifyApiKeys.CLIENT_ID}:${spotifyApiKeys.CLIENT_SECRET}`;
    return {
      url: 'https://accounts.spotify.com/api/token',
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + (btoa(buffer)),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: 'grant_type=client_credentials',
      json: true
    };
  }

  sendAuthRequest(): Observable<SpotifyAuthResponse> {
    return this.http.post<SpotifyAuthResponse>(
      this.authRequestPayload.url,
      this.authRequestPayload.body,
      {headers: this.authRequestPayload.headers}
    );
  }
}
