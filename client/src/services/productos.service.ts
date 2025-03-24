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

  listByCareer(carrera_id : any) {
    return this.http.get(`${environment.API_URI}/api/productos/carrera/${carrera_id}`);
  }
}
