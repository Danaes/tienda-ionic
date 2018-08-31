import { Component } from '@angular/core';
import {ProductosProvider} from "../../providers/productos/productos";
import {PorCategoriasPage} from "../por-categorias/por-categorias";

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  lineas: Linea[] = [];
  por_categoria = PorCategoriasPage;

  constructor(private _ps: ProductosProvider) {
    this.lineas = _ps.lineas;
  }
}

interface Linea{
  id: string,
  linea: string,
  icono: string
}
