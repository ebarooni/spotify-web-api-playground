import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-credentials',
  templateUrl: './delete-credentials.component.html',
  styleUrls: ['./delete-credentials.component.scss']
})
export class DeleteCredentialsComponent implements OnInit {
  @Output() credentialsDeleteRequestEmitter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
