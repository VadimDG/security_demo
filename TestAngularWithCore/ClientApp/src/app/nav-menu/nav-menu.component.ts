import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  userName = 'Vasia';

  constructor() {
    // this.userName = adalSvc.LoggedInUserName;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
