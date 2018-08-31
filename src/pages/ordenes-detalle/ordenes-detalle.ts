import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ProductoPage} from "../producto/producto";
import {CarritoProvider} from "../../providers/carrito/carrito";

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden: Pedido = null;
  productoPage = ProductoPage;

  constructor(navParams: NavParams,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private _cs: CarritoProvider) {
    this.orden = navParams.get("orden");
  }

  removeOrder(){

    this._cs.removeOrder( this.orden.id )
      .subscribe( res => {

        if( res.err ){
          //Mostrar err
        } else {
          this.navCtrl.pop();
        }
      });
  }

}

interface Pedido {
  id: string,
  creado_en: string,
  productos: Producto
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
