import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {CarritoProvider} from "../../providers/carrito/carrito";
import { ProductoPage } from "../producto/producto";

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  productoPage = ProductoPage;

  constructor(public viewCtrl: ViewController,
              public _cs: CarritoProvider) {
    _cs.setTotal();
  }

  remove( codigo: string ){
    this._cs.removeItem( codigo );
  }

}
