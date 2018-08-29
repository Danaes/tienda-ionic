import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarritoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CarritoSerivce');
  }

}
