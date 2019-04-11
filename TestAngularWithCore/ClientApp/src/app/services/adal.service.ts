import { Injectable } from '@angular/core';

import * as Msal from 'msal';

declare var bootbox: '';
@Injectable()
export class MsalService {

    B2CTodoAccessTokenKey = 'b2c.access.token';

    tenantConfig = {
        tenant: 'yogablog.onmicrosoft.com',
        // Replace this with your client id
        clientID: 'de517035-e140-437b-8ac8-bc99f96e4ac4',
        signInPolicy: 'B2C_1_yoga-blog',
        signUpPolicy: 'B2C_1_yoga-blog',
        redirectUri: 'http://localhost:4200',
        b2cScopes: ['https://yogablog.onmicrosoft.com/access-api/user_impersonation']
    };

    // Configure the authority for Azure AD B2C
    authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority,
        (errorDesc: any, token: any, error: any, tokenType: any) => {
      }
    );

    public login(): void {
      // tslint:disable-next-line:max-line-length
      this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signInPolicy;
      this.authenticate();
    }

    public signup(): void {
      // tslint:disable-next-line:max-line-length
      this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signUpPolicy;
      this.authenticate();
    }

    public authenticate(): void {
        // tslint:disable-next-line:variable-name
        const _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then((idToken: any) => {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                (accessToken: any) => {
                    _this.saveAccessTokenToCache(accessToken);
                }, (error: any) => {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        (accessToken: any) => {
                            _this.saveAccessTokenToCache(accessToken);
                        }, (error1: any) => {
                            console.log('error: ', error1);
                        });
                });
        }, (error: any) => {
            console.log('error: ', error);
        });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    }

    logout(): void {
        this.clientApplication.logout();
    }

    isLoggedIn(): boolean {
        return this.clientApplication.getUser() != null;
    }

    getUserEmail(): string {
       // tslint:disable-next-line:no-string-literal
       return this.getUser().idToken['emails'][0];
    }

    getUser() {
      return this.clientApplication.getUser();
    }
}
