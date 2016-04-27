import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/components/app.component';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'rxjs/Rx';
import {AUTH_PROVIDERS} from "angular2-jwt/angular2-jwt";

if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, HTTP_PROVIDERS, AUTH_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '<%= APP_BASE %>'})
]);

