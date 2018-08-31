import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ProductosProvider {

  pagina:number = 0;
  productos:any[] = [];
  lineas:any[] = [];
  productosByCategoria:any[] = [];
  busqueda: any[] = [];

  constructor(public http: HttpClient) {
    this.getAll();
    this.getLineas();
  }

  getAll(){

    return new Promise( (resolve, reject) => {

      let url = URL_SERVICIOS + "/productos/getAll/" + this.pagina;

      this.http.get<Productos>( url )
        .subscribe( data => {

          if( !data.err ){

            if( data.productos.length == 0 ){
              resolve(false);
              return;
            }

            let newData = this.agrupar(data.productos, 2);

            this.productos.push( ...newData );
            this.pagina += 1;
          }
          resolve(true);

        });
    });
  }

  getLineas(){
    let url = URL_SERVICIOS + "/lineas";
    this.http.get<Lineas>( url )
      .subscribe( data => {

          if ( data.err ){
            //Problemas
          } else {

            this.lineas = data.lineas;

          }

      });
  }

  getByCategoria( categoria: string){

    let url = URL_SERVICIOS + "/productos/getByType/" + categoria;

    this.http.get<Productos>( url )
      .subscribe( data => {

        if( data.err ){
          //Problemas
        } else {

          this.productosByCategoria = data.productos;
        }

      });

  }

  private agrupar(arr:any, tamano:number){

    let newArr = [];
    for( let i=0; i<arr.length; i+=tamano ){
      newArr.push( arr.slice(i, i+tamano) );
    }

    return newArr;

  }

  searchProducto(termino: string){

    let url = URL_SERVICIOS + "/productos/search/" + termino;
    this.http.get<any>( url )
      .subscribe( res => {

        if ( res.err ){

        } else {

          this.busqueda = res.productos;

        }

      });
  }

}

interface Productos extends Object{
  err: boolean;
  productos: any[];
}

interface Lineas extends Object{
  err: boolean;
  lineas: any[];
}
