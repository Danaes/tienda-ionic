import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductosProvider} from "../../providers/productos/productos";
import {ProductoPage} from "../producto/producto";

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  categoria: Categoria = null;
  producto = ProductoPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ps: ProductosProvider) {

    this.categoria = navParams.get("categoria");
    _ps.getByCategoria( this.categoria.id );

  }
}

interface Categoria {
  id: string,
  linea: string,
  icono: string
}
