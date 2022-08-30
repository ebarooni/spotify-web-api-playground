import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-error-table',
  templateUrl: './error-table.component.html',
  styleUrls: ['./error-table.component.scss']
})
export class ErrorTableComponent implements OnInit {
  @Input() error$?: Observable<HttpErrorResponse>;

  constructor() { }

  ngOnInit(): void {
  }

}
