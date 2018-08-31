import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CarritoProvider} from "../../providers/carrito/carrito";

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto: Producto;
  detalle: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoProvider) {
    this.producto = this.navParams.get("producto");
    this.detalle = this.navParams.get("detalle");
  }

  removeItem( codigo: string ){
    this._cs.removeItem( codigo );
    this.navCtrl.pop();
  }



}

interface Producto{
  codigo: string,
  descripcion: string,
  linea: string,
  linea_id: string,
  precio_compra: string,
  producto: string,
  proveedor: string
}
