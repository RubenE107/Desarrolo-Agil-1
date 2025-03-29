import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  listOne(id : any) {
    return this.http.get(`${environment.API_URI}/api/productos/${id}`);
  }

  list() {
    return this.http.get(`${environment.API_URI}/api/productos`);
  }

  filter(data : any) {
    return this.http.post(`${environment.API_URI}/api/productos/filtrar`, data);

  }
  listByCareer(carrera_id : any) {
    return this.http.get(`${environment.API_URI}/api/productos/carrera/${carrera_id}`);

  }
  create(producto_descripcion: any, producto_precio: any, producto_existencia: any, producto_estado: any, id_carrera_p:any ){
    return this.http.post(`${environment.API_URI}/api/productos/create`,{"producto_descripcion": producto_descripcion, "producto_precio": producto_precio,"producto_existencia": producto_existencia, "producto_estado": producto_estado, "id_carrera_p": id_carrera_p});
  }
}
