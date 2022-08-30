import { Component, OnInit } from '@angular/core';
import {ClientCredentialsService} from "../client-credentials.service";
import {tap} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  readonly tableColumns: string[] = ['Access token', 'Expires in', 'Token type'];
  readonly spotifyAccessToken$ = this.clientCredentialsService.sendAuthRequest()
    .pipe(
      tap(response => localStorage.setItem(
        'access_token_info',
        JSON.stringify({access_token: response.access_token, expiration: moment.now()})
      ))
    )

  constructor(readonly clientCredentialsService: ClientCredentialsService) { }

  ngOnInit(): void {
  }

}
