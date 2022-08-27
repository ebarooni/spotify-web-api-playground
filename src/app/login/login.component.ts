import { Component, OnInit } from '@angular/core';
import {spotifyApiKeys} from "../api-secrets/spotify-api-keys";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const endPoint = 'https://accounts.spotify.com/authorize?';
    const clientId = `client_id=${spotifyApiKeys.CLIENT_ID}`;
    const responseType = 'response_type=code';
    const redirectUri = 'redirect_uri=http://localhost:4200/callback';
    const state = this.generateRandomString(16);
    window.location.href = `${endPoint}${clientId}&${responseType}&${redirectUri}&${state}`;
  }

  private generateRandomString(length: number): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

}
