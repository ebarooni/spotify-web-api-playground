import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {faGithub, faStackOverflow} from "@fortawesome/free-brands-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-social-media-icons',
  templateUrl: './social-media-icons.component.html',
  styleUrls: ['./social-media-icons.component.scss']
})
export class SocialMediaIconsComponent implements OnInit {
  readonly githubIcon = faGithub;
  readonly stackOverflowIcon = faStackOverflow;
  readonly coffeeIcon = <IconProp>faCoffee;

  constructor() { }

  ngOnInit(): void {
  }

}
