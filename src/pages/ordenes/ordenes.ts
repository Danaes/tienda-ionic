import { Component } from '@angular/core';
import {CarritoProvider} from "../../providers/carrito/carrito";
import {OrdenesDetallePage} from "../ordenes-detalle/ordenes-detalle";

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenes_detalle = OrdenesDetallePage;

  constructor(public _cs: CarritoProvider) {
  }

  ionViewWillEnter(){
    this._cs.getOrders();
  }

}
