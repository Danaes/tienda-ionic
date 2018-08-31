import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { Storage } from '@ionic/storage';
import {AlertController, LoadingController, Platform, ToastController} from "ionic-angular";

@Injectable()
export class UsuarioProvider {

  token: string;
  userId: string;

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public storage: Storage,
              private alertCtrl: AlertController) {
    this.loadStorage();
  }

  login( correo: string, contrasena: string ){

    const loader = this.loadingCtrl.create({
      content: "Espere por favor ...",
      spinner: 'bubbles'
    });

    loader.present();

    let url = URL_SERVICIOS + "/login";

    return new Promise((resolve, reject) => {
      this.http.post<any>( url, {"correo": correo, "contrasena": contrasena} )
        .subscribe( res => {

            if ( res.err ){

              this.alertCtrl.create({
                title: "Error al iniciar sesión",
                subTitle: res.message,
                buttons: ["Ok"]
              }).present();

              loader.dismiss();
              resolve(false);

            } else {

              this.token = res.token;
              this.userId = res.userId;
              this.saveStorage();

              loader.dismiss();
              resolve(true);
            }

          },
          err => console.warn("Error login", err)
        );
    });
  }

  logout(){
    this.token = null;
    this.userId = null;

    this.toastCtrl.create({
      message: 'Cerrando sesión',
      position: 'top',
      duration: 2000
    }).present();

    this.saveStorage();
  }

  private saveStorage(){

    if( this.platform.is('cordova')) {
      this.storage.set("token", this.token);
      this.storage.set("userId", this.userId);
    } else {
      if( this.token ) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("userId", this.userId);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    }

  }

  loadStorage(){

    return new Promise( (resolve, reject) => {

      if( this.platform.is('cordova')) {
        this.storage.ready()
          .then(() => {
            this.storage.get("token").then(token => {

              if (token)
                this.token = token;

            });

            this.storage.get("userId").then(userId => {

              if (userId)
                this.userId = userId;

            });
          });

        resolve();

      } else{

        if (localStorage.getItem( "token" ) && localStorage.getItem( "userId" )){
          this.token = localStorage.getItem( "token" );
          this.userId = localStorage.getItem( "userId" );
        }

        resolve();
      }

    });
  }

}
