import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AccessTokenProps} from "../client-credentials-flow/access-token.repository";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data$?: Observable<AccessTokenProps>;
  @Input() errorHandler$?: Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
