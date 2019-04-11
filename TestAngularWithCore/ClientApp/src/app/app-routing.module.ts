import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
// import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [{
  path: '', component: AppComponent, children: [
    {
      path: '', component: MainComponent, children: [
        { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [MsalGuard] },
        { path: 'counter', component: CounterComponent, canActivate: [MsalGuard] },
        { path: 'fetch-data', component: FetchDataComponent, canActivate: [MsalGuard] }
      ]
    },
    { path: 'logout', component: LogoutComponent },
    { path: '**', component: NotFoundComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
