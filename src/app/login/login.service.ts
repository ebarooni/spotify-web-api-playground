import { Injectable } from '@angular/core';
import {spotifyApiKeys} from "../api-secrets/spotify-api-keys";

@Injectable()
export class LoginService {
  private readonly REDIRECT_URI = 'http://localhost:4200/dashboard';

  constructor() { }

  private static generateRandomString(length: number): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  private static generateUrlWithSearchParams(url: string, params: any): string {
    const urlObject = new URL(url);
    urlObject.search = new URLSearchParams(params).toString();
    return urlObject.toString();
  }

  private static async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const digest = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(codeVerifier),
    );

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  redirectToSpotifyAuthEndpoint(): void {
    const codeVerifier = LoginService.generateRandomString(64);
    LoginService.generateCodeChallenge(codeVerifier)
      .then((codeChallenge) => {
        window.localStorage.setItem('code_verifier', codeVerifier);
        window.location.href = LoginService.generateUrlWithSearchParams(
          'https://accounts.spotify.com/authorize',
          {
            client_id: spotifyApiKeys.CLIENT_ID,
            response_type: 'code',
            redirect_uri: this.REDIRECT_URI,
            state: codeVerifier,
            code_challenge_method: 'S256',
            codeChallenge,
          },
        );
      })
  }
}
