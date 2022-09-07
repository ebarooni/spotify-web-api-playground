import { Component, OnInit } from '@angular/core';
import {version, deps, buildTime} from "../../../environments/version";

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {
  readonly version = version;
  readonly buildTime = new Date(buildTime);
  readonly dependencies = deps;

  constructor() { }

  ngOnInit(): void {
  }

}
