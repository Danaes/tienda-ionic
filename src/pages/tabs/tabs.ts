import { CategoriasPage } from '../categorias/categorias';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { OrdenesPage } from '../ordenes/ordenes';
import {BusquedaPage} from "../busqueda/busqueda";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home = HomePage;
  categorias = CategoriasPage;
  pedidos = OrdenesPage;
  busqueda = BusquedaPage;

}
