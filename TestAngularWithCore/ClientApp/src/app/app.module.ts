import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MainComponent } from './main/main.component';
import { CounterComponent } from './counter/counter.component';
import { LogoutComponent } from './logout/logout.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { MsalModule } from '@azure/msal-angular';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { FormsModule } from '@angular/forms';
import { MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogLevel } from 'msal';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LogoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MsalModule.forRoot({
      clientID: 'de517035-e140-437b-8ac8-bc99f96e4ac4',
      authority: 'https://login.microsoftonline.com/te/yogablog.onmicrosoft.com/B2C_1_yoga-blog/',
      redirectUri: 'http://localhost:4200/',
        validateAuthority: true,
        cacheLocation: 'localStorage',
        navigateToLoginRequestUrl: false,
        popUp: false,
        unprotectedResources: ['https://www.microsoft.com/en-us/'],
        correlationId: '1000',
        level: LogLevel.Info,
        piiLoggingEnabled: true
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// MsAdalAngular6Module.forRoot({
//   tenant: 'azurelearn123.onmicrosoft.com',
//   clientId: '9e60b2e4-ba2b-43ed-bed8-c164d1965237',
//   redirectUri: 'http://localhost:4200',
//   endpoints: {},
//   navigateToLoginRequestUrl: false,
//   cacheLocation: 'localStorage',
// })
// https://medium.com/@sambowenhughes/configuring-your-angular-6-application-to-use-microsoft-b2c-authentication-99a9ff1403b3