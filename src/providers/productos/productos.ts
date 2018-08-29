import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ProductosProvider {

  pagina:number = 0;
  productos:any[] = [];

  constructor(public http: HttpClient) {
    this.loadAll();
  }

  loadAll(){

    return new Promise( (resolve, reject) => {

      let url = URL_SERVICIOS + "/productos/getAll/" + this.pagina;

      this.http.get( url )
        .subscribe( data => {

          if( !data.err ){

            if( data.productos.length == 0 ){
              resolve(false);
              return;
            }

            this.productos.push( ...data.productos );
            this.pagina += 1;
          }

          resolve(true);
  
        });
    });
  }

}