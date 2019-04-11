import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }


}
