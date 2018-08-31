import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AlertController, Platform, ToastController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from "../usuario/usuario";
import {URL_SERVICIOS} from "../../config/url.servicios";

@Injectable()
export class CarritoProvider {

  items: Producto[] = [];
  total_precio: number;
  pedidos: Pedido[] = [];

  constructor(public http: HttpClient,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private platform: Platform,
              private storage: Storage,
              public _us: UsuarioProvider) {
    this.loadStorage();
    this.setTotal();
  }

  addCart (producto: Producto){
    for ( let item of this.items ) {
      if ( item.codigo == producto.codigo){
        this.alertCtrl
          .create({
            title: 'Producto existente',
            subTitle: producto.producto + ' ya está en el carrito de compras',
            buttons:["Ok"]
          })
          .present();

        return;
      }
    }

    this.toastCtrl.create({
      message: 'Producto añadido al carrito de compras',
      showCloseButton: true,
      closeButtonText: 'Ok'
    }).present();

    this.items.push( producto );
    this.setTotal();
    this.saveStorage();

  }

  private saveStorage(){

    if( this.platform.is('cordova'))
      this.storage.set( "items", this.items );
    else
      localStorage.setItem( "items", JSON.stringify( this.items ));

  }

  loadStorage(){

    return new Promise( (resolve, reject) => {

      if( this.platform.is('cordova'))
        this.storage.ready()
          .then( () => {
            this.storage.get("items").then( items => {

              if( items )
                this.items = items;

              resolve();
            });
          });

      else{

        if (localStorage.getItem( "items" ))
          this.items = JSON.parse( localStorage.getItem( "items" ));

        resolve();
      }

    });
  }

  setTotal(){
    this.total_precio = 0;
    for (let item of this.items)
      this.total_precio += Number( item.precio_compra );
  }

  public removeItem( codigo: string ){
    this.items.splice( this.items.findIndex(item => item.codigo === codigo), 1)
    this.saveStorage();
    this.setTotal();
  }

  makeOrder(){

    let url = URL_SERVICIOS + "/pedidos/makeOrder/" + this._us.token + "/" + this._us.userId;
    let codigos: string[] = [];

    for (let item of this.items)
      codigos.push( item.codigo );

    this.http.post<any>(url, {items: codigos.join(',')})
      .subscribe( res => {

        if( res.err ){
          this.alertCtrl.create({
            title: 'ERROR!',
            subTitle: res.message,
            buttons: ["Ok"]
          }).present();

        } else {

          this.items = [];
          this.saveStorage();
          this.setTotal();
          this.alertCtrl.create({
            title: 'Pedido realizado',
            subTitle: 'Pronto recibirá su pedido',
            buttons: ["Ok"]
          }).present();
        }

      });

  }

  getOrders(){

    let url = URL_SERVICIOS + "/pedidos/getOrder/" + this._us.token + "/" + this._us.userId;
    this.http.get<any>( url).subscribe( res => {

      if( res.err ){
        //mostramos error
      } else {

        this.pedidos = res.ordenes;

      }

    });
  }

  removeOrder(orderId: string){

    let url = URL_SERVICIOS + "/pedidos/removeOrder/" + this._us.token + "/" + this._us.userId + "/" + orderId;

    return this.http.delete<any>( url );
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

interface Pedido {
  id: string,
  creado_en: string,
  detalle: Producto
}
