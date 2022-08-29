import { Component, OnInit } from '@angular/core';
import {faGithub, faLinkedin, faStackOverflow} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  readonly currentYear = new Date().getFullYear();
  readonly githubIcon = faGithub;
  readonly linkedInIcon = faLinkedin;
  readonly stackOverflowIcon = faStackOverflow;

  constructor() { }

  ngOnInit(): void {
  }

}
