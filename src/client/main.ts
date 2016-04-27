import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/components/app.component';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'rxjs/Rx';
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";

if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerName: "Authorization",
                headerPrefix: "JWT",
                tokenName: "id_token",
                globalHeaders: [{'Content-Type': 'application/json'}],
                noJwtError: false,
                noTokenScheme: false
            }), http);
        },
        deps: [Http]
    }),
    provide(APP_BASE_HREF, {useValue: '<%= APP_BASE %>'})
]);

