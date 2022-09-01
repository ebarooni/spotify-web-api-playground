import { Component, OnInit } from '@angular/core';
import {faGithub, faStackOverflow} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-social-media-icons',
  templateUrl: './social-media-icons.component.html',
  styleUrls: ['./social-media-icons.component.scss']
})
export class SocialMediaIconsComponent implements OnInit {
  readonly githubIcon = faGithub;
  readonly stackOverflowIcon = faStackOverflow;

  constructor() { }

  ngOnInit(): void {
  }

}
