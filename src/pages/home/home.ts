import { ProductoPage } from '../producto/producto';
import { Component } from '@angular/core';
import {ModalController} from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { CarritoProvider } from "../../providers/carrito/carrito";
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {LoginPage} from "../login/login";
import {CarritoPage} from "../carrito/carrito";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas: boolean = true;
  productoPage = ProductoPage;

  constructor(public modalCtrl: ModalController,
              public _ps: ProductosProvider,
              public _cs: CarritoProvider,
              public _us: UsuarioProvider) {
  }

  login(){
    this.modalCtrl.create( LoginPage ).present();
  }

  showCart(){

    let modal:any;

    modal = ( this._us.token ) ?
      this.modalCtrl.create( CarritoPage ) :
      this.modalCtrl.create( LoginPage );

    modal.present();

    modal.onDidDismiss( (openCart: boolean) => {

      if( openCart )
        this.modalCtrl.create( CarritoPage ).present();

    })

  }

  nextPage( infiniteScroll ){

    this._ps.getAll()
      .then( (hayMas: boolean) => {
        this.hayMas = hayMas;
        infiniteScroll.complete();
    });

  }

}
