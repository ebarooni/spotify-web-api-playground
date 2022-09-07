import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ImplicitGrantService {
  private readonly REDIRECT_URI = environment.redirectUri;

  constructor(@Inject(DOCUMENT) private document: Document) { }

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

  private static convertToSpaceSeparatedString(scope: string[] | null): string {
    if (scope !== null) {
      if (scope.length > 0) {
        let stringScope = '';
        scope.forEach(item => {
          stringScope += `${item} `;
        });
        return stringScope.trim();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  redirectToSpotifyAuthEndpoint(clientId: string | null, scope: string[] | null): void {
    if (clientId !== null) {
      const codeVerifier = ImplicitGrantService.generateRandomString(64);
      localStorage.setItem('code_verifier_implicit_grant', codeVerifier);
      this.document.location.href = ImplicitGrantService.generateUrlWithSearchParams(
        'https://accounts.spotify.com/authorize',
        {
          client_id: clientId,
          scope: ImplicitGrantService.convertToSpaceSeparatedString(scope),
          response_type: 'token',
          redirect_uri: this.REDIRECT_URI,
          state: codeVerifier
        },
      );
    }
  }

  clearBrowserUrl(): void {
    this.document.defaultView?.history.replaceState({}, this.document.title, '/');
  }
}
