import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin,NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { APP_STATES } from '@core/store';


// Configure the NGXS Storage Plugin options
const ngxsStoragePluginOptions: NgxsStoragePluginOptions = {
  keys:['login']
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()), 
    provideStore(
      APP_STATES,
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsLoggerPlugin(),
      withNgxsRouterPlugin(),
      withNgxsStoragePlugin(ngxsStoragePluginOptions)
    )
  ]

};
