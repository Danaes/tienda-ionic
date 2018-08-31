import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo: string = "";
  contrasena: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private _us: UsuarioProvider) {
  }

  login(){
    this._us.login( this.correo, this.contrasena)
      .then( success => {
        if ( success ) this.viewCtrl.dismiss(true);
      });

  }
}
