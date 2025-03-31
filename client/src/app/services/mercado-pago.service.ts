import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(private http: HttpClient) { }
  crearOrden(title:string,cantidad:number,precio_unitario:number): any {
    const body = {
      items: [
        {
          title: title,
          quantity: cantidad,
          unit_price: precio_unitario,
        }
      ],
      auto_return: "approved"
    };
    console.log(body);
    return this.http.post(`${environment.API_URIMercado}/crear_orden`, body );
  }
}
