import { Component, OnInit } from '@angular/core';
import {ClientCredentialsService} from "../client-credentials.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  readonly tableColumns: string[] = ['Access token', 'Expires in', 'Token type'];
  readonly spotifyAccessToken$ = this.clientCredentialsService.sendAuthRequest();

  constructor(readonly clientCredentialsService: ClientCredentialsService) { }

  ngOnInit(): void {
  }

}
