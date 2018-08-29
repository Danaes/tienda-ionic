import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductoPage } from '../pages/producto/producto';
import { OrdenesDetallePage } from '../pages/ordenes-detalle/ordenes-detalle';
import { CategoriasPage } from '../pages/categorias/categorias';
import { CarritoPage } from '../pages/carrito/carrito';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdenesPage } from '../pages/ordenes/ordenes';
import { LoginPage } from './../pages/login/login';
import { PorCategoriasPage } from './../pages/por-categorias/por-categorias';

import { UsuarioProvider } from './../providers/usuario/usuario';
import { ProductosProvider } from './../providers/productos/productos';
import { CarritoProvider } from './../providers/carrito/carrito';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductoPage,
    PorCategoriasPage,
    OrdenesDetallePage,
    CategoriasPage,
    CarritoPage,
    LoginPage,
    TabsPage,
    OrdenesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductoPage,
    PorCategoriasPage,
    OrdenesDetallePage,
    HomePage,
    CategoriasPage,
    CarritoPage,
    LoginPage,
    TabsPage,
    OrdenesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //UsuarioProvider,
    ProductosProvider,
    //CarritoProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})

export class AppModule {}
