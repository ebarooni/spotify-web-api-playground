import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Injectable()
export class AuthorizationCodeService {
  private readonly REDIRECT_URI = 'http://localhost:4200/';

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

  redirectToSpotifyAuthEndpoint(clientId: string | null, scope: string[] | null): void {
    const codeVerifier = AuthorizationCodeService.generateRandomString(64);
    AuthorizationCodeService.generateCodeChallenge(codeVerifier)
      .then((codeChallenge) => {
        localStorage.setItem('code_verifier_authorization_code', codeVerifier);
        this.document.location.href = AuthorizationCodeService.generateUrlWithSearchParams(
          'https://accounts.spotify.com/authorize',
          {
            client_id: clientId,
            response_type: 'code',
            redirect_uri: this.REDIRECT_URI,
            state: codeVerifier,
            scope: AuthorizationCodeService.convertToSpaceSeparatedString(scope),
            code_challenge_method: 'S256',
            codeChallenge,
          },
        );
      });
  }

  clearBrowserUrl(): void {
    this.document.defaultView?.history.replaceState({}, this.document.title, '/');
  }
}
