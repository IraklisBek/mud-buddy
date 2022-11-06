import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera } from '@ionic-native/Camera/ngx';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NativeErrorHttpInterceptor } from './core/helpers/interceptos/native-error.interceptor';
import { NativeHttpInterceptor } from './core/helpers/interceptos/native.interceptor';
import { BrowserHttpInterceptor } from './core/helpers/interceptos/browser.interceptor';
import { BrowserErrorHttpInterceptor } from './core/helpers/interceptos/browser-error.interceptor';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: NativeErrorHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NativeHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BrowserHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BrowserErrorHttpInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
