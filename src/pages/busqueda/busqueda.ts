import { Component } from '@angular/core';
import {ProductosProvider} from "../../providers/productos/productos";
import {ProductoPage} from "../producto/producto";

@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  productoPage = ProductoPage;

  constructor(public _ps: ProductosProvider) {
  }

  searchProducts( ev: any){

    const val = ev.target.value;

    this._ps.searchProducto(val);
  }

}
